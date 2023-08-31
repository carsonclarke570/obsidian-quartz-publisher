
import { Notice, TFile, Vault } from "obsidian";
import { getAPI } from "obsidian-dataview";
import { QuartzPublishPluginSettings } from "./settings";
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

        return replacedText;
    }
}