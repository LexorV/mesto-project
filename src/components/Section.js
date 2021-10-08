export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._rendererItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._container.append(element);
    }

    rendererItems() {
        this._rendererItems.forEach(element => {
            this._renderer(element);
        });
    }

}