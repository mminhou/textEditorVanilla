export default function Tab({$app, initialState}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    $app.appendChild(this.$target);

    this.render = () => {
        this.$target.innerHTML = `<p>asdf</p>`
    };

    this.render();

};