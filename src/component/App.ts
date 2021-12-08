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


    }

    template() {
        return `
            <h1>Text Editor</h1>
            <form>
                <div style="width: 100%">
                    <ul>
                        <li class="newFile">새파일</li>
                        <li class="loadFile">로드</li>
                        <li class="save">저장</li>
                        <input id="input">
                        <li class="saveAs">다른이름으로 저장</li>
                    </ul>
                </div>
                <div class="notepad"></div>
            </form>
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
                console.log('load');
            }
            if (save) {
                this.$notepad.save();
                console.log('save');
            }
            if (saveAs) {
                this.$notepad.saveAs();
                console.log('saveAs');
            }
        });
    }
}
