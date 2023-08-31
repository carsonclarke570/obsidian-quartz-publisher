import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, QuartzPublishPluginSettings } from './src/settings';
import { QuartzPublishSettingTab } from './src/settingsTab';
import Publisher from 'src/publisher';
import { PublisherModal } from 'src/publisherModal';
import PublisherStatusManager from 'src/publisherStatus';
import MarkdownConverter from 'src/converter';

export default class QuartzPublishPlugin extends Plugin {
    settings: QuartzPublishPluginSettings;
    publisherModal: PublisherModal

    async onload() {
        await this.loadSettings();

        this.addSettingTab(new QuartzPublishSettingTab(this.app, this));

        this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			this.openModal();
		});
    }

    onunload() {

    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

	async openModal() {
		if (!this.publisherModal) {
            const converter = new MarkdownConverter(this.settings, this.app.vault);
            const publisher = new Publisher(converter, this.settings);
            const publisherStatusManager = new PublisherStatusManager(this.app.vault, converter, this.settings)
            this.publisherModal = new PublisherModal(this.app, publisher, publisherStatusManager, this.settings)
		}
        this.publisherModal.open()
	}

    async saveSettings() {
        await this.saveData(this.settings);
    }
}