import Notepad from "./Notepad";
import Tab from "./Tab";

export default class App {
    $target = document.createElement('div');
    $notepad: Notepad;
    tabs: Tab[] = JSON.parse(localStorage.getItem('tabs'));

    constructor($app) {
        $app.appendChild(this.$target);
        this.init();
    }

    init() {
        this.render();
        this.$notepad = new Notepad(document.querySelector('.notepad'));
    }

    template() {
        const test = this.tabs ? this.tabs.map(tab => {
            return `
                <li class="loadFile" data-title="${tab.title}">${tab.title}</li> 
            `
        }).join('') : ``

        return `
            <h1>Text Editor</h1>
                <nav role="navigation" style="width: 100%">
                    <ul>
                        <li class="newFile">새파일</li>
                        <li>불러오기
                            <ul class="dropdown">
                                ${test}
                            </ul>
                        </li>
                        <li class="save">저장</li>
                        <li style="width: 300px;">
                            <input id="input" required>
                            <span class="saveAs">다른이름으로 저장</span>
                        </li>
                    </ul>
                </nav>
                <div class="notepad"></div>
        `
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
                // @ts-ignore
                this.$notepad.load(loadFile.dataset.title)
                console.log('load');
            }
            if (save) {
                this.$notepad.save();
                window.location.reload();
                console.log('save');
            }
            if (saveAs) {
                this.$notepad.saveAs();
                console.log('saveAs');
            }
        });
    }
}
