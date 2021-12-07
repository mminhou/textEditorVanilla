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
            <button class="add">add</button>
            <button class="save">save</button>
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
        });

    };


    this.render();
};