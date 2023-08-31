import QuartzPublishPlugin from 'main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class QuartzPublishSettingTab extends PluginSettingTab {
    plugin: QuartzPublishPlugin;

    constructor(app: App, plugin: QuartzPublishPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        const titleDiv = containerEl.createDiv()
        const titleHeading = titleDiv.createEl("h1")
        titleHeading.innerText = "Quartz Publisher"

        const githubDiv = containerEl.createDiv()
        const githubHeading = githubDiv.createEl("h2")
        githubHeading.innerText = "Github Settings"

        new Setting(githubDiv)
            .setName('Token')
            .setDesc('Your personal access token. Create a token at https://github.com/settings/tokens')
            .addText(text => text
                .setPlaceholder('<token>')
                .setValue(this.plugin.settings.githubToken)
                .onChange(async (value) => {
					this.plugin.settings.githubToken = value;
					await this.plugin.saveSettings();
				}));

        new Setting(githubDiv)
            .setName('Username')
            .setDesc('Your GitHub username')
            .addText(text => text
                .setPlaceholder('<username>')
                .setValue(this.plugin.settings.githubUserName)
                .onChange(async (value) => {
                    this.plugin.settings.githubUserName = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(githubDiv)
            .setName('GitHub Repo')
            .setDesc('Your Quartz 4.0 repo on GitHub')
            .addText(text => text
                .setPlaceholder('<repo>')
                .setValue(this.plugin.settings.githubRepo)
                .onChange(async (value) => {
                    this.plugin.settings.githubRepo = value;
                    await this.plugin.saveSettings();
                }));

        const pluginDiv = containerEl.createDiv()
        const pluginHeading = pluginDiv.createEl("h2")
        pluginHeading.innerText = "Plugin Support"

        new Setting(pluginDiv)
            .setName("Render Dataview")
            .setDesc("Attempts to render Dataview to markdown.")
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.renderDataview)
                .onChange(async (value) => {
                    this.plugin.settings.renderDataview = value;
                    await this.plugin.saveSettings();
                }))
    }
}