export default class Tab implements TabInterface {
    title
    content
    editedContent
    isEdited
    isSaved

    constructor(num: number) {
        this.title = 'new'+num;
        this.content = 'temp'+num;
        this.editedContent = 'temp'+num;
        this.isEdited = false;
        this.isSaved = false;
    }

    getTabName(): string {
        return this.title
    }

    getTabContent(): string {
        if (this.isEdited) {
            return this.editedContent
        } else {
            return this.content
        }
    }

    setEditedContent(data: string): void {
        this.editedContent = data;
    }
}