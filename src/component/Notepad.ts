import Tab from "./Tab";

export default class Notepad {
    $target = document.createElement('div');
    tabs: Tab[] = [];
    activatedTab: string;

    constructor($parent) {
        $parent.appendChild(this.$target);
        this.$target.className = "notepad";
        this.init();
    }

    /**
     * 처음 한번만 호출되기 위한 Init() 함수 정의
     */
    init() {
        const getTabs = JSON.parse((localStorage.getItem('tabs'))) || [];
        this.tabs = getTabs;
        this.render();
    }

    /**
     * html template 구성 담당 로직
     */
    template() {
        const tabList = this.tabs.map((tab) => {
            return `
                <p class="active-btn" data-title="${tab.title}" style="width: ${80/this.tabs.length}%; color: ${this.activatedTab === tab.title ? '#FF5733' : 'black'};">
                    ${tab.title}
                    <span style="color: #FF5733">${tab.isEdited ? '(*)' : ''}</span>
                </p>
                <span class="close-btn" data-title="${tab.title}" style="padding-right: 10px; border-right: 1px solid black;">x</span>
            `
        }).join('');

        const tabContent = this.tabs.map((tab) => {
            return tab.title === this.activatedTab ? `
                <textarea id="textarea" name="opinion" cols="100" rows="25" style="margin-bottom: 10px;">${tab.isEdited ? tab.editedContent : tab.content}</textarea>
            ` : ``
        }).join('');

        return tabList ? `
            <div class="tab-list">
                <h4 class="tab-list-item">${tabList}</h4>
                <div class="tab-content">
                    ${tabContent}
                </div>
            <div>
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
        console.log(this.tabs);
        let tab = new Tab(Math.floor(Math.random() * 100));
        const chk = this.tabs.find(e => e.title === tab.title);
        if (chk) {
            alert('Please retry');
            return
        }
        this.tabs.push(tab);
        this.activeTab(tab.title);
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
     * Tab content 저장 로직
     */
    save() {
        const targetTab = this.tabs.find(e => e.title === this.activatedTab);
        if (targetTab) {
            // @ts-ignore
            const curTabContent = document.getElementById('textarea').value;
            targetTab.content = curTabContent;
            targetTab.isEdited = false;
            // saveStorage 호출
            this.saveStorage(targetTab, undefined);
            this.render();
            alert('Successful save tab data.');

        } else {
            alert('Error: The selected tab does not exist.');
        }
    }

    /**
     * Tab 을 다른 이름으로 저장하기 위한 로직
     */
    saveAs() {
        const targetTab = this.tabs.find(e => e.title === this.activatedTab);
        if (targetTab) {
            const prevTitle = targetTab.title;
            // @ts-ignore
            const nextTitle = document.getElementById('input').value;
            if (this.tabs.find(e => e.title === nextTitle)) {
                alert('Error: The title is already in use,');
                return
            }
            // @ts-ignore
            const curTabContent = document.getElementById('textarea').value;
            targetTab.title = nextTitle;
            targetTab.content = curTabContent;
            targetTab.isEdited = false;
            // saveStorage 호출
            this.saveStorage(targetTab, prevTitle);
            this.render();
            alert('Successful save as another name.');
            window.location.reload();
        } else {
            alert('Error: The selected tab does not exist.');
        }
    }

    /**
     * Tab 활성화 담당 로직
     * -> 이벤트가 너무 많이 걸리는 이슈 해결중..
     * -> 일단 render()에서 이벤트 걸어줄 때, tab이 activateTab과 같으면 넘어오지 않도록 함
     * -> 기능추가: active 할 때 textarea의 데이터와 이전 tab의 데이터 비교 -> 다르면 setEditedContent true
     */
    activeTab(tabName: string) {
        console.log(this.tabs);
        const targetTab = this.tabs.find(e => e.title === this.activatedTab);
        if (this.tabs.includes(targetTab)) {
            // @ts-ignore
            const curTabContent = document.getElementById('textarea').value;
            if (curTabContent !== targetTab.content) {
                targetTab.isEdited = true;
                targetTab.editedContent = curTabContent;
            }
        }
        this.activatedTab = tabName;
        this.render();
    }

    /**
     * save() -> saveStorage() 호출로 선택된 data만 localStorage에 저장되도록 함.
     */
    saveStorage(saveData: Tab, prevTitle: string) {
        let curStorage = JSON.parse(localStorage.getItem('tabs')) || [];
        if (prevTitle) {
            let chk = curStorage.find(e => e.title === prevTitle);
            if (chk) {
                const idx = curStorage.indexOf(chk);
                curStorage[idx] = saveData;
            } else {
                curStorage.push(saveData);
            }
        } else {
            let chk = curStorage.find(e => e.title === saveData.title);
            if (chk) {
                const idx = curStorage.indexOf(chk);
                curStorage[idx] = saveData;
            } else {
                curStorage.push(saveData);
            }
        }
        localStorage.setItem('tabs', JSON.stringify(curStorage));
    }

    /**
     * Tab 목록 불러오는 로직 (localstorage 에서 받아옴)
     */
    load(loadData: string) {
        let curStorage = JSON.parse(localStorage.getItem('tabs')) || [];
        const target = curStorage.find(e => e.title === loadData);
        if (this.tabs.find(e => e.title === loadData)) {
            this.activeTab(loadData);
            return
        }
        this.tabs.push(target);
        this.render();
        this.activeTab(loadData);
    }
}