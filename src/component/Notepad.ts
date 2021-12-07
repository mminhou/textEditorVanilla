import Tab from "./Tab";

export default class Notepad {
    $target = document.createElement('div')
    tabs: Tab[] = [];

    constructor($parent) {
        $parent.appendChild(this.$target);
        this.init();
    }

    init() {
        let tab1 = new Tab()
        this.tabs.push(tab1)
        this.tabs.push(tab1)
        this.render();
    }

    template() {
        const tabList = this.tabs.map((tab) => {
            return `
                ${tab}
            `
        }).join('')


        return `
            <p>notepad</p>
            ${tabList}

        `
    }

    render() {
        this.$target.innerHTML = this.template();
    }

    create() {
        let tab = new Tab();
        this.tabs.push(tab);
        this.render();
    }



}