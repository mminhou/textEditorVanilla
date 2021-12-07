import Component from "../core/Component";

export default class Nav {
    $target = document.createElement('div');
    create

    constructor($parent, create) {
        $parent.appendChild(this.$target);
        this.create = create
        this.init();
    }

    init() {
        this.render();
    }

    template() {
        return `
            <ul>
                <li class="newFile">새파일</li>
                <li class="loadFile">로드</li>
                <li class="save">저장</li>
                <li class="saveAs">다른이름으로 저장</li>
            </ul>
    `;
    }

    render() {
        this.$target.innerHTML = this.template();
        this.$target.addEventListener('click', (e) => {
            const target = e.target as Element
            const newFile = target.closest('.newFile')
            const loadFile = target.closest('.loadFile')
            const save = target.closest('.save')
            const saveAs = target.closest('.saveAs')
            if (newFile) {
                this.create();
            }
            if (loadFile) {
                console.log('load')
            }
            if (save) {
                console.log('save')
            }
            if (saveAs) {
                console.log('saveAs')
            }
        });
    }
}