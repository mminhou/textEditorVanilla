import Nav from "./Nav";
import TabList from "./TabList";
// class notepad

export default function App($app) {
    this.state = {
        tabs: ['tab1', 'tab2', 'tab3']
    };


    this.addTabBtn = () => {
        this.state.tabs.push('1');
        tabList.setState(this.state.tabs);
    };

    this.closeTabBtn = () => {

    }

    const nav = new Nav({
        $app,
        addTabBtn: this.addTabBtn
    });
    const tabList = new TabList({
        $app,
        initialState: this.state.tabs,
        closeTabBtn: this.closeTabBtn
    });


};