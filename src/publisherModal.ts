import { App, ButtonComponent, Modal, Notice, setIcon } from "obsidian";
import { QuartzPublishPluginSettings } from "./settings";
import Publisher from "./publisher";
import PublisherStatusManager from "./publisherStatus";
import { PublisherModalChangesList } from "./publisherModalList";
import { PublisherModalStatus } from "./publisherModalStatus";

export class PublisherModal {
    modal: Modal;
    settings: QuartzPublishPluginSettings
    publisher: Publisher
    publisherStatusManager: PublisherStatusManager

    publishedList: HTMLElement

    changesList: PublisherModalChangesList
    changesListElement: HTMLElement

    status: PublisherModalStatus

    constructor(app: App, publisher: Publisher, publisherStatusManager: PublisherStatusManager, settings: QuartzPublishPluginSettings) {
        this.modal = new Modal(app)
        this.settings = settings
        this.publisher = publisher
        this.publisherStatusManager = publisherStatusManager;
        this.changesList = new PublisherModalChangesList(this.publisherStatusManager)

        this.initialize()
    }

    async initialize() {
        this.modal.titleEl.innerText = "Publishing Menu";

        this.status = new PublisherModalStatus(this.modal.contentEl.createEl("div"))
        
        this.changesListElement = this.createCollapsableSection("Changes", true)
        this.publishedList = this.createCollapsableSection("Published", false)
        this.changesList.initialize(this.changesListElement, this.publishedList)

        this.createPublishButton()

        this.modal.onOpen = async () => { await this.refresh() };
        this.modal.onClose = async () => { await this.clear() };
    }

    createPublishButton() {
        const section = this.modal.contentEl.createEl("div", {
            attr: {
                style: "display: flex; justify-content: end;"
            }
        })

        const button = new ButtonComponent(section)
            .setButtonText("Publish")
            .onClick(async () => {
                button.setDisabled(true)
                this.status.setStatus("Attempting to publish your changes...")
                new Notice("Attempting to publish your changes...")
                
                let i = 1;
                const success = await this.publisher.publishAll(this.changesList.collect(), (event) => {
                    this.status.setStatus(`Publishing ${event.fileName} (${i}/${event.numFiles})`);
                    i++;
                })
              
                const message = success ? "Finished publishing your changes." : "Failed to publish your changes!";
                this.status.setStatus(message)
                new Notice(message)

                this.refresh()
                button.setDisabled(false)
            })
    }

    createCollapsableSection(title: string, isOpen: boolean) {
        const section = this.modal.contentEl.createEl("div")

        const header = section.createEl("div", { attr: { style: "display: flex; justify-content: space-between; margin-bottom: 10px; align-items:center" } })
        const body = section.createDiv({
            attr: {
                style: "padding-left: 10px"
            }
        })
        if (isOpen) {
            body.show()
        } else {
            body.hide()
        }

        const headerTitle = header.createEl("h4")
        headerTitle.innerText = title

        const icon = header.createDiv({ attr: { style: "display: flex; padding-right: 10px; cursor: pointer;" } })
        setIcon(icon, isOpen ? "minus" : "plus")

        icon.onClickEvent(() => {
            if (!body.isShown()) {
                setIcon(icon, "minus")
                body.show();
            } else {
                setIcon(icon, "plus")
                body.hide();
            }
        })

        return body
    }


    open() {
        this.modal.open()
    }

    async clear() {
        await this.changesList.clear()
        this.publishedList.innerHTML = ''
    }

    async refresh() {
        this.status.setStatus("Checking for changes...")
        await this.changesList.refresh()
        this.status.clear()
    }
}