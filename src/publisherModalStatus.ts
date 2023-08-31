export class PublisherModalStatus {
    
    parent: HTMLElement

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    setStatus(status: string) {
        this.clear();
        const statusEl = this.parent.createEl("i")
        statusEl.innerText = status
    }

    clear() {
        this.parent.innerHTML = '';
    }
}