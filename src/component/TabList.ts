export default function TabList({$app, closeTabBtn, selectTab, activeTab}) {
    this.state = JSON.parse(localStorage.getItem('tabs'));
    this.$target = document.createElement('div');
    this.closeTabBtn = closeTabBtn;
    this.selectTab = selectTab;
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const tabs = this.state.map((tab) => {
            return `
                <div class="selectedTab" data-name="${tab}"
                     style="display: inline-block; width: 100px; border: 1px solid black; padding: 10px;">
                    ${tab}
                </div> 
                <button class="closeTabBtn" data-name="${tab}">x</button>
            `
        }).join('');

        this.$target.innerHTML = `
            <div style="width: 100%; display: inline-block;">
                ${tabs} 
            </div>
        `

        this.$target.addEventListener('click', (e) => {
            const selected = e.target.closest('.selectedTab')
            if (selected) {
                this.selectTab(selected.dataset.name);
                return
            }

            const closeTarget = e.target.closest('.closeTabBtn')
            if (closeTarget) {
                this.closeTabBtn(closeTarget.dataset.name)
                return
            }
        });

    };
    this.render();
};