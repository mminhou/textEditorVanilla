import Tab from "./Tab";

export default class Notepad {
    $target = document.createElement('div')
    tabs: Tab[] = [];
    cnt: number = 0;

    constructor($parent) {
        $parent.appendChild(this.$target);
        this.init();
    }

    init() {
        let tab1 = new Tab(this.cnt++)
        this.tabs.push(tab1)
        let tab2 = new Tab(this.cnt++)
        this.tabs.push(tab2)
        this.render();
    }

    template() {
        const tabList = this.tabs.map((tab) => {
            return `
                <p style="display: inline-block; width: 150px; border-left: 1px solid black; border-right: 1px solid black; margin: 0;">
                    ${tab.getTabName()}
                    <span class="close-btn" data-title="${tab.getTabName()}" style="float: right; padding-right: 10px;">x</span>
                </p>
            `
        }).join('')


        return `
            <p>notepad</p>
            <div class="tab-list" style="border: 1px solid black">
                ${tabList}
            <div>
        `
    }

    render() {
        this.$target.innerHTML = this.template();
        this.$target.addEventListener('click', (e) => {
            const closeBtn = (e.target as Element).closest('.close-btn')
            console.log(closeBtn)

        })

    }

    create() {
        let tab = new Tab(this.cnt++);
        this.tabs.push(tab);
        this.render();
    }

    close(tabName: string) {
        const targetTab = this.tabs.find(e => e.title === tabName);
        // this.tabs.splice(targetTab, 1)
        console.log(targetTab);

        this.render();
    }


}