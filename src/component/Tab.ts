export default class Tab implements TabInterface {
    title
    content
    editedContent
    isEdited
    isSaved

    constructor(num: number) {
        this.title = 'tab'+num;
        this.content = 'You can edited this field.';
        this.editedContent = '';
        this.isEdited = false;
        this.isSaved = false;
    }
}