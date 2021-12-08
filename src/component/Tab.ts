export default class Tab implements TabInterface {
    title
    content
    editedContent
    isEdited
    isSaved

    constructor(num: number) {
        this.title = 'new'+num;
        this.content = 'You can edited this field.';
        this.editedContent = '';
        this.isEdited = false;
        this.isSaved = false;
    }

    getTabTitle(): string {
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

    static fromJSON(serializedJson, cnt) {
        return Object.assign(new Tab(cnt), JSON.parse(serializedJson))
    }
}