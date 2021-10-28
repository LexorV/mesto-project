export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        //  this.setPopupCloseEventListeners = this.setPopupCloseEventListeners.bind(this);
        //this.close = this.close.bind(this);
    }

    open() {
        console.log("Hello from class Popup");
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this.setPopupCloseEventListeners()
        this.closeEventListeners('.popup__button-close')
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }
    setPopupCloseEventListeners() {
        this._popup.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                this.close();
            }
        })
    }

    closeEventListeners() {
        this._popup.querySelector('.popup__button-close').addEventListener('click', () => {
            this.close()
        });

    }
}