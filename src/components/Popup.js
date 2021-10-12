export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._setPopupCloseEventListeners = this.setPopupCloseEventListeners.bind(this);
        //this.close = this.close.bind(this);
    }

    open() {
        console.log("Hello from class Popup");
        this._popup.classList.add('popup_opened');
        console.log(this._popup)
        document.addEventListener('keydown', this._handleEscClose);
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

    setEventListeners(btnClose) {
        this._popup.querySelector(btnClose).addEventListener('click', () => {
            this.close()
        });

    }
}


export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        // setEventListeners();
    }

    open({ imgSrcUrl, namePlaceText, imgSelector, textImgSelector }) {
        console.log("Hello from class PopupWithImage");

        this._popup.querySelector(imgSelector).src = imgSrcUrl;
        this._popup.querySelector(textImgSelector).textContent = namePlaceText;
        super.open();
    }

}



class PopupWithForm extends Popup {
    constructor(popapSlector, handleSubmit) {
        super(popapSlector)
        this._form = this._popup.querySelector(".popup__container-form");
        this._handleSubmit = handleSubmit

    }

    _getInputvalues() {
        // this._inputValues = Array.from(this._form.querySelectorAll(".popup__field")).map(el => el.value);
        this._inputList = this._form.querySelectorAll(".popup__field");
        this._formsValues = Array.from(this._inputList).map((input) => {
            return {
                [input.id]: input.value
            }
        })


        // this._formValue = {}
        // this._inputList.forEach((element) => {
        //     this._formValue[element] = element.value;
        //     {name:'Jak'}
        // })
    }

    setEventListeners(btnClose) {
        super.setEventListeners(btnClose);
        this._form.addEventListener('submit', this._handleSubmit)
    }

    close() {
        super.close();
        this._form.reset();
    }
}