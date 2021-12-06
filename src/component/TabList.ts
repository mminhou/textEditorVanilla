export default function TabList({$app, initialState, closeTabBtn}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.closeTabBtn = closeTabBtn;
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const tabs = this.state.map((tab) => {
            return `
                <div style="display: inline-block; width: 100px;">
                    ${tab}
                    <button>x</button>
                </div> 
            `
        }).join('');

        this.$target.innerHTML = `
            <div style="width: 100%; display: inline-block;">
                ${tabs}
            </div>
        `


        this.$target.addEventListener('click', (e) => {
            if (e.target.closest('.closeTabBtn')) {
                this.closeTabBtn();

            }
        });

    };
    this.render();
};