import Nav from "./Nav";
import TabList from "./TabList";
import Tab from "./Tab";
// class notepad

export default function App($app) {
    this.activeTab = 'tab1';

    this.addTabBtn = () => {
        if (localStorage.getItem('tabs') === '[]') {
            localStorage.setItem('tabs', JSON.stringify(['tab1']));
            localStorage.setItem('tab1', 'tab1content');
            tabList.setState(['tab1']);
            return
        }
        const tmp = JSON.parse(localStorage.getItem('tabs'));
        const lastTab = tmp[tmp.length-1];
        const lastNum = parseInt(lastTab.replace( /[^0-9]/g, ""))+1;
        tmp.push('tab'+lastNum);
        localStorage.setItem('tabs', JSON.stringify(tmp));
        localStorage.setItem('tab'+lastNum, 'tab'+lastNum+'content');
        tabList.setState(tmp);
    };

    this.closeTabBtn = (targetName) => {
        console.log(targetName)
        const tmp = JSON.parse(localStorage.getItem('tabs'));
        if (tmp.includes(targetName)) {
            const targetId = tmp.indexOf(targetName);
            tmp.splice(targetId, 1);
            localStorage.setItem('tabs', JSON.stringify(tmp));
            tabList.setState(tmp);
            tab.setState('');
        }
    }

    this.selectTab = (selectedTabName) => {
        // const selectedTabData = localStorage.getItem(selectedTabName);
        // console.log(selectedTabData);
        tab.setState(selectedTabName);
        tab.render();
    }

    this.saveBtn = () => {
        localStorage.setItem('tabs', this.state.tabs);
        console.log(localStorage.getItem('tabs'));

    }

    const nav = new Nav({
        $app,
        addTabBtn: this.addTabBtn,
        saveBtn: this.saveBtn
    });

    const tabList = new TabList({
        $app,
        closeTabBtn: this.closeTabBtn,
        selectTab: this.selectTab,
        activeTab: this.activeTab
    });

    const tab = new Tab({
        $app,
        initialState: localStorage.getItem(this.activeTab)
    })


};