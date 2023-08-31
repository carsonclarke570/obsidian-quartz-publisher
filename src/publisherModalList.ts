import { Notice, TFile, setIcon } from "obsidian"
import PublisherStatusManager from "./publisherStatus"
import { PublishChange, PublishChoice, PublishType } from "./types";

export class PublisherModalChangesList {

    private static CHANGE_LUT: Map<PublishType, { icon: string; class: string; }> = new Map([
        [PublishType.ADD, { icon: "file-plus", class: "change-list-add" }],
        [PublishType.UPDATE, { icon: "file-diff", class: "change-list-diff" }],
        [PublishType.DELETE, { icon: "file-minus", class: "change-list-minus" }]
    ])

    changesParent: HTMLElement
    publishedParent: HTMLElement

    publisherStatusManager: PublisherStatusManager
    selectedChanges: Map<string, PublishChoice>

    constructor(publisherStatusManager: PublisherStatusManager) {
        this.publisherStatusManager = publisherStatusManager
        this.selectedChanges = new Map()
    }

    initialize(changesParent: HTMLElement, publishedParent: HTMLElement)  {
        this.changesParent = changesParent
        this.publishedParent = publishedParent
    }

    async clear() {
        if (this.changesParent) {
            this.changesParent.innerHTML = ''
            this.selectedChanges.clear()
        } 

        if (this.publishedParent) {
            this.publishedParent.innerHTML = ''
        }
    }

    async refresh() {
        await this.clear()
        await this.populate()
    }

    collect(): Array<PublishChange> {
        const changes: Array<PublishChange> = []
        for (const key of this.selectedChanges.keys()) {
            const change = this.selectedChanges.get(key)
            if (change && change.isSelected) {
                changes.push(change.change)
            }
        }
        return changes
    }

    private async populate() {
        const publishStatus = await this.publisherStatusManager.getStatus()
        const totalChanges = (publishStatus.changedNotes.length + publishStatus.deletedNotePaths.length + publishStatus.unpublishedNotes.length)

        if (this.changesParent) {
            if (totalChanges !== 0) {
                const selectAll = this.changesParent.createDiv({
                    attr: {
                        style: `display: flex; flex-direction: row; align-items: center; padding-bottom: 8px;`
                    }
                })
        
                const input = selectAll.createEl('input')
                input.setAttribute("type", "checkbox")
                input.setAttribute("id", "select-all")
                input.onchange = this.selectAllHandler(this.changesParent, input)
        
                const label = selectAll.createEl('label')
                label.setAttribute("for", "select-all")
                label.innerText = "Select All"
        
                this.populateChanges(publishStatus.unpublishedNotes, PublishType.ADD)
                this.populateChanges(publishStatus.changedNotes, PublishType.UPDATE)
                this.populateChanges(publishStatus.deletedNotePaths, PublishType.DELETE)
            }
        }
 
        if (this.publishedParent) {
            this.populatePublished(publishStatus.publishedNotes)
        }
    }

    private populatePublished(files: TFile[]) {
        const list = this.publishedParent.createEl('ul')
        for (const file of files) {
            const item = list.createEl('li')
            item.innerText = file.path
        }
    }

    private populateChanges(files: string[] | TFile[], change: PublishType) {

        const className = PublisherModalChangesList.CHANGE_LUT.get(change)?.class || ""
        const iconId = PublisherModalChangesList.CHANGE_LUT.get(change)?.icon || ""
        for (const file of files) {
            const item = this.changesParent.createEl('div', {
                attr: {
                    style: `display: flex; flex-direction: row; align-items: center;`
                }
            })
            item.addClass(className)
            item.addClass("change-list")

            const fileName = file instanceof TFile ? file.path : file
            const input = item.createEl('input')
            input.setAttribute("type", "checkbox")
            input.setAttribute("id", fileName)
            input.onchange = this.selectHandler(this.changesParent, input)

            const icon = item.createDiv({
                attr: {
                    style: "display: flex; padding-right: 5px"
                }
            })
            setIcon(icon, iconId)

            const label = item.createEl('label')
            label.setAttribute("for", fileName)
            label.innerText = fileName

            this.selectedChanges.set(fileName, {
                isSelected: input.checked,
                change: {
                    path: fileName,
                    type: change,
                    file: file instanceof TFile ? file : undefined
                }
            })
        }
    }

    private selectHandler(parent: HTMLElement, element: HTMLInputElement) {
        return () => {
            const change = this.selectedChanges.get(element.id)
            if (change === undefined) {
                new Notice(`Error: Unrecognized element ID: ${element.id}`)
                return;
            }
            change.isSelected = element.checked
            this.selectedChanges.set(element.id, change)

            const e = <HTMLInputElement>parent.querySelector(`input[id="select-all"]`)
            e.checked = false
        }
    }

    private selectAllHandler(parent: HTMLElement, element: HTMLInputElement) {
        return () => {
            for (const key of this.selectedChanges.keys()) {
                const change = this.selectedChanges.get(key)
                if (change === undefined) {
                    new Notice(`Error: Unrecognized element ID: ${key}`)
                    return;
                }
                change.isSelected = element.checked

                const e = <HTMLInputElement>parent.querySelector(`input[id="${key}"]`)
                e.checked = element.checked;
            }
            console.log(this.selectedChanges)
        }
    }
}