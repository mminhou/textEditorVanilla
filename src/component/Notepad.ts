import Tab from "./Tab";

export default class Notepad {
    $target = document.createElement('div');
    tabs: Tab[] = [];
    activatedTab: string;
    cnt: number = 0;

    constructor($parent) {
        $parent.appendChild(this.$target);
        this.$target.className = "notepad";
        this.init();
    }

    /**
     * 처음 한번만 호출되기 위한 Init() 함수 정의
     */
    init() {
        let tab1 = new Tab(this.cnt++);
        this.tabs.push(tab1);
        let tab2 = new Tab(this.cnt++);
        this.tabs.push(tab2);
        this.render();
    }

    /**
     * html template 구성 담당 로직
     */
    template() {
        const tabList = this.tabs.map((tab) => {
            return `
                <p class="active-btn" data-title="${tab.getTabName()}" style="display: inline-block; width: 150px; border: 1px solid black; margin: 0; 
                    color: ${this.activatedTab === tab.getTabName() ? 'red' : 'black'}; ">
                    ${tab.getTabName()}
                </p>
                <span class="close-btn" data-title="${tab.getTabName()}" style="padding-right: 10px;">x</span>
            `
        }).join('')

        const tabContent = this.tabs.map((tab) => {
            return tab.getTabName() === this.activatedTab ? `
                <textarea id="textarea" name="opinion" cols="30" rows="5" >${tab.getTabContent()} </textarea>
            ` : ``
        }).join('')


        return tabList ? `
            <div class="tab-list" style="border: 1px solid black">
                <h3>${tabList}</h3>
            <div>
            ${tabContent}
        ` : `<h3>Tab does not exist!</h3>`
    }

    /**
     * 렌더링 담당 로직 -> this.template()에 정의한 html을 기반으로 rendering 해준다.
     * 해결과제: tab의 close, active event 를 여기서 걸어주었는데 이로 인한 이벤트 너무 많이 발생
     */
    render() {
        this.$target.innerHTML = this.template();
        this.$target.addEventListener('click', (e) => {
            const $closed = (e.target as Element).closest('.close-btn');
            const $activate = (e.target as Element).closest('.active-btn');
            if ($closed) {
                // @ts-ignore
                const title = $closed.dataset.title;
                this.closeTab(title);
                return
            }
            if ($activate) {
                // @ts-ignore
                const title = $activate.dataset.title;
                if (title === this.activatedTab) {
                    return
                }
                this.activeTab(title);
                return
            }
        })
    }


    /**
     * Tab 생성 로직
     * -> 전역 cnt를 기반으로 새로운 new+'number' tab을 생성한다.
     */
    create() {
        let tab = new Tab(this.cnt++);
        this.tabs.push(tab);
        this.render();

    }

    /**
     * Tab 을 닫기 위한 로직
     * -> parameter: tabName -> tabName으로 targetTab을 찾은후 this.tabs에서 제거 -> 이후 렌더링
     */
    closeTab(tabName: string) {
        const targetTab = this.tabs.find(e => e.title === tabName);
        if (!this.tabs.includes(targetTab)) {
            return
        }
        const targetTabIdx = this.tabs.indexOf(targetTab);
        this.tabs.splice(targetTabIdx, 1);
        this.render();
    }

    /**
     * Tab 활성화 담당 로직
     * -> 이벤트가 너무 많이 걸리는 이슈 해결중..
     * -> 일단 render()에서 이벤트 걸어줄 때, tab이 activateTab과 같으면 넘어오지 않도록 함
     * -> 기능추가: active 할 때 textarea의 데이터와 이전 tab의 데이터 비교 -> 다르면 setEditedContent true
     */
    activeTab(tabName: string) {
        if (this.activatedTab) {
            const targetTab = this.tabs.find(e => e.title === this.activatedTab);
            const curTabContent = document.getElementById('textarea').value;
            console.log(curTabContent, '#####', targetTab.getTabContent())
            console.log(curTabContent == targetTab.getTabContent())
            if (curTabContent !== targetTab.getTabContent()) {
                targetTab.isEdited = true;
                targetTab.setEditedContent(curTabContent);
            }
        }
        console.log(this.activatedTab)
        console.log(tabName)
        this.activatedTab = tabName;
        this.render();
    }
}