export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }
    openPopup() {
        this.classList.add('popup_opened');
        document.addEventListener('keydown', _handleESC);
    }
    closePopup() {
        this.classList.remove('popup_opened');
        document.removeEventListener('keydown', _handleESC);
    }
    _handleESC(evt) {
        if (evt.key === 'Escape') {
            closePopup(formTemp);
        };
    }
}