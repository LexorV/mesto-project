import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        // setEventListeners();
    }

    open({ imgSrcUrl, namePlaceText }) {
        console.log("Hello from class PopupWithImage");

        this._popup.querySelector('.popup__picture-place').src = imgSrcUrl;
        this._popup.querySelector('.popup__picture-place').alt = namePlaceText;
        this._popup.querySelector('.popup__name-place').textContent = namePlaceText;
        super.open();
    }

}