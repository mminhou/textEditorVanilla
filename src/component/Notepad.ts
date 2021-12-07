export default class Notepad {
    $target = document.createElement('div')
    tabs: Tab[] = [];

    constructor($parent) {
        $parent.appendChild(this.$target);
        this.init();
    }

    init() {
        this.render();
    }

    template() {
        return `<p>notepad</p>`
    }

    render() {
        this.$target.innerHTML = this.template();
    }

}