export default class Tab implements TabInterface{
    title
    content
    isFailed
    isSaved

    constructor() {
        this.title = 'new';
        this.content = 'temp';
        this.isFailed = false;
        this.isSaved = false;
    }
}