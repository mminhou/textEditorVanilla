export default class Tab implements TabInterface {
    title
    content
    isFailed
    isSaved

    constructor(num) {
        this.title = 'new'+num;
        this.content = 'temp'+num;
        this.isFailed = false;
        this.isSaved = false;
    }

    getTabName(): string {
        return this.title
    }

    getTabContent(): string {
        return this.content
    }
}