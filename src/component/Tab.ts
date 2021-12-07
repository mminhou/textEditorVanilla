export default function Tab({$app, initialState}) {
    this.state = '';
    this.$target = document.createElement('div');
    $app.appendChild(this.$target);

    this.setState = (tabName) => {
        const content = localStorage.getItem(tabName);
        this.state = content;
        console.log(tabName, content)
        this.render();
    };

    this.render = () => {
        this.$target.innerHTML = `
            <textarea>${this.state}</textarea>

    `
    };

    this.render();

};