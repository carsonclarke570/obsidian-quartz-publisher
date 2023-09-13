
import { Component, Notice, TFile, Vault } from "obsidian";
import { getAPI } from "obsidian-dataview";
import { QuartzPublishPluginSettings } from "./settings";
import { escapeRegExp } from "./utils";


const DATAVIEW_REGEX = /```dataview\s(.+?)```/gsm;

export default class MarkdownConverter {

    settings: QuartzPublishPluginSettings;
    vault: Vault;

    constructor(settings: QuartzPublishPluginSettings, vault: Vault) {
        this.settings = settings;
        this.vault = vault;
    }

    async convertFile(file: TFile): Promise<string> {
        const text = await this.vault.cachedRead(file);
        return this.convertText(text, file.path)
    }

    async convertText(text: string, path: string): Promise<string> {
        let replacedText = text;
        if (this.settings.renderDataview) {
            replacedText = await this.convertDataView(replacedText, path)
        }
        return replacedText
    }

    private async convertDataView(text: string, path: string): Promise<string> {
        let replacedText = text;
        const dvApi = getAPI();
        if (!dvApi) return replacedText;

        const matches = text.matchAll(DATAVIEW_REGEX);

        const dataviewJsPrefix = dvApi.settings.dataviewJsKeyword;
        const dataViewJsRegex = new RegExp(
            "```" + escapeRegExp(dataviewJsPrefix) + "\\s(.+?)```",
            "gsm",
        );
        const dataviewJsMatches = text.matchAll(dataViewJsRegex);


        const inlineQueryPrefix = dvApi.settings.inlineQueryPrefix;
        const inlineDataViewRegex = new RegExp(
            "`" + escapeRegExp(inlineQueryPrefix) + "(.+?)`",
            "gsm",
        );
        const inlineMatches = text.matchAll(inlineDataViewRegex);

        const inlineJsQueryPrefix = dvApi.settings.inlineJsQueryPrefix;
        const inlineJsDataViewRegex = new RegExp(
            "`" + escapeRegExp(inlineJsQueryPrefix) + "(.+?)`",
            "gsm",
        );
        const inlineJsMatches = text.matchAll(inlineJsDataViewRegex);

        if (!matches && !inlineMatches && !dataviewJsMatches && !inlineJsMatches) { 
            return text; 
        }

        for (const queryBlock of matches) {
            try {
                const block = queryBlock[0];
                const query = queryBlock[1];
                const markdown = await dvApi.tryQueryMarkdown(query, path);
                replacedText = replacedText.replace(block, `${markdown}\n{ .block-language-dataview}`);
            } catch (e) {
                console.log(e)
                new Notice("Unable to render dataview query. Please update the dataview plugin to the latest version.")
                return queryBlock[0];
            }
        }

        for (const queryBlock of dataviewJsMatches) {
			try {
				const block = queryBlock[0];
				const query = queryBlock[1];

				const div = createEl("div");
				const component = new Component();
				await dvApi.executeJs(query, div, component, path);
				component.load();

				replacedText = replacedText.replace(block, div.innerHTML);
			} catch (e) {
				console.log(e);
				new Notice(
					"Unable to render dataviewjs query. Please update the dataview plugin to the latest version.",
				);
				return queryBlock[0];
			}
		}

		//Inline queries
		for (const inlineQuery of inlineMatches) {
			try {
				const code = inlineQuery[0];
				const query = inlineQuery[1];
				const dataviewResult = dvApi.tryEvaluate(query, {
					this: dvApi.page(path),
				});
				if (dataviewResult) {
					replacedText = replacedText.replace(
						code,
						dataviewResult.toString(),
					);
				}
			} catch (e) {
				console.log(e);
				new Notice(
					"Unable to render inline dataview query. Please update the dataview plugin to the latest version.",
				);
				return inlineQuery[0];
			}
		}

		for (const inlineJsQuery of inlineJsMatches) {
			try {
				const code = inlineJsQuery[0];
				const query = inlineJsQuery[1];

				const div = createEl("div");
				const component = new Component();
				await dvApi.executeJs(query, div, component, path);
				component.load();

				replacedText = replacedText.replace(code, div.innerHTML);
			} catch (e) {
				console.log(e);
				new Notice(
					"Unable to render inline dataviewjs query. Please update the dataview plugin to the latest version.",
				);
				return inlineJsQuery[0];
			}
		}


        return replacedText;
    }
}