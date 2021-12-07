import Button from "@material-ui/core";

export default function Nav({$app, addTabBtn, saveBtn}) {
    this.$target = document.createElement('div');
    this.addTabBtn = addTabBtn;
    this.saveBtn = saveBtn;
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `               
            <h1>Navigation</h1>
            <button>새파일</button>
            <div>
                <button class="load">로드</button>
                <ul>
                    <li>Sub Item 1</li>
                    <li>Sub Item 2</li>
                </ul>
            </div>
            <button>저장</button>
            <button>다른이름으로 저장</button>
        `

        this.$target.addEventListener('click', (e) => {
            if (e.target.closest('.add')) {
                this.addTabBtn();
                return
            }
            if (e.target.closest('.save')) {
                this.saveBtn();
                return
            }
            if (e.target.closest('.load')) {
                console.log('load data')
                var parent = e.parentElement;
                var dd = parent.lastChild.previousSibling;
                dd.classList.toggle('show');
                console.log(localStorage)
                return
            }
        });

    };


    this.render();
};