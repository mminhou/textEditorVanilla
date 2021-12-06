import {Button} from "@material-ui/core";

export default function Nav({$app, addTabBtn}) {
    this.$target = document.createElement('div');
    this.addTabBtn = addTabBtn;
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `               
            <h1>Navigation</h1>
            <button class="add">add</button>
            <button>save</button>
            <button>save as name</button>
        `

        this.$target.addEventListener('click', (e) => {
            if (e.target.closest('.add')) {
                this.addTabBtn();
                return
            }
        });

    };


    this.render();
};