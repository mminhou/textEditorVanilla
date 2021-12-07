import Component from "../core/Component";
import {$} from "../utils/util"

import Notepad from "./Notepad";
// class notepad

export default class App {
    $target = document.createElement('div');
    $notepad: Notepad

    constructor($app) {
        $app.appendChild(this.$target);
        this.init();
    }

    init() {
        this.render();
        this.$notepad = new Notepad(document.querySelector('.notepad'));

        // this.notepad = localStorage
        // console.log(this.notepad)
        // console.log(this.notepad.keys());
        // this.render();
        // this.$nav = new Nav(document.getElementById('nav'), this.create)

    }

    template() {
        return `
            <h1>Text Editor</h1>
            <div style="width: 100%">
                <ul>
                    <li class="newFile">새파일</li>
                    <li class="loadFile">로드</li>
                    <li class="save">저장</li>
                    <li class="saveAs">다른이름으로 저장</li>
                </ul>
            </div>
            <div class="notepad"></div>
        `


        // const tabList = Object.keys(this.notepad).map((key) => {
        //     return `
        //         <button style="display: inline-block; width: 250px" onClick="this.selectTab()">${key}</button>
        //     `
        // }).join('')
        //
        // const tabContent = Object.entries(this.notepad).map((obj) => {
        //     return this.activeTab === obj[0] ?
        //         `<p>${obj[1]}</p>` : ``
        // }).join('')
        //
        // return `
        //     <h1>Editor</h1>
        //     <div id="nav"></div>
        //     <br/><br/><br/>
        //     <div style="display: inline-block">
        //         ${tabList}
        //     </div>
        //     <div>
        //         ${tabContent}
        //     </div>
        // `
    }

    render() {
        this.$target.innerHTML = this.template();
        this.$target.addEventListener('click', (e) => {
            const target = e.target as Element;
            const newFile = target.closest('.newFile');
            const loadFile = target.closest('.loadFile');
            const save = target.closest('.save');
            const saveAs = target.closest('.saveAs');
            if (newFile) {
                this.$notepad.create();
                console.log('create');
            }
            if (loadFile) {
                console.log('load');
            }
            if (save) {
                console.log('save');
            }
            if (saveAs) {
                console.log('saveAs');
            }
        });

    }

}


// export default class App extends Component {
//     constructor(...rest) {
//         console.log(...rest)
//         super(...rest);
//         this.initialState()
//     }
//
//     async initialState() {
//         this.setState({
//
//         });
//     }
//
//     componentDidMount() {
//         new Nav($('nav'), {})
//
//     }
//
//     template() {
//         return `
//             <h1>Notepad</h1>
//             <div class="nav">navigation</div>
//             <div class="tabList">tabList</div>
//             <div class="content">content</div>
//         `;
//     }
//
// }


// export default function App($app) {
// this.activeTab = 'tab1';
//
// this.addTabBtn = () => {
//     if (localStorage.getItem('tabs') === '[]') {
//         localStorage.setItem('tabs', JSON.stringify(['tab1']));
//         localStorage.setItem('tab1', 'tab1content');
//         tabList.setState(['tab1']);
//         return
//     }
//     const tmp = JSON.parse(localStorage.getItem('tabs'));
//     const lastTab = tmp[tmp.length-1];
//     const lastNum = parseInt(lastTab.replace( /[^0-9]/g, ""))+1;
//     tmp.push('tab'+lastNum);
//     localStorage.setItem('tabs', JSON.stringify(tmp));
//     localStorage.setItem('tab'+lastNum, 'tab'+lastNum+'content');
//     tabList.setState(tmp);
// };
//
// this.closeTabBtn = (targetName) => {
//     console.log(targetName)
//     const tmp = JSON.parse(localStorage.getItem('tabs'));
//     if (tmp.includes(targetName)) {
//         const targetId = tmp.indexOf(targetName);
//         tmp.splice(targetId, 1);
//         localStorage.setItem('tabs', JSON.stringify(tmp));
//         tabList.setState(tmp);
//         tab.setState('');
//     }
// }
//
// this.selectTab = (selectedTabName) => {
//     // const selectedTabData = localStorage.getItem(selectedTabName);
//     // console.log(selectedTabData);
//     tab.setState(selectedTabName);
//     tab.render();
// }
//
// this.saveBtn = () => {
//     localStorage.setItem('tabs', this.state.tabs);
//     console.log(localStorage.getItem('tabs'));
//
// }
//
// const nav = new Navtmp({
//     $app,
//     addTabBtn: this.addTabBtn,
//     saveBtn: this.saveBtn
// });
//
// const tabList = new TabListtmp({
//     $app,
//     closeTabBtn: this.closeTabBtn,
//     selectTab: this.selectTab,
//     activeTab: this.activeTab
// });
//
// const tab = new Tabtmp({
//     $app,
//     initialState: localStorage.getItem(this.activeTab)
// })
//     const notepad = new Notepad();
//     notepad.render();
//
// };