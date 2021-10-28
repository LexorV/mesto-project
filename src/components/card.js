export class Card {
    constructor({ data, handleCardClick, api }, cardSelector, user) {
            this._data = data;
            this._handleCardClick = handleCardClick;
            this._cardSelector = cardSelector;
            this._api = api;
            this._user = user;
            this.likeBtnListener = this.likeBtnListener.bind(this);
        }
        /*
                    

                    this._handleCardClick = this._handleCardClick.bind(this);
                    this.likeBtnListener = this.likeBtnListener.bind(this);
                }*/

    _deleteCard() {
        console.log("card delete")
        this._api
            .deleteCard(this._data._id)
            .then(() => {
                this._card.remove();
                this._card = null;
            })
            .catch((err) => console.error(err));


    }

    _checkBasketDelete() {
        if (this.checkDeleteBasket) {
            this._removeButton.style.display = 'none';
        }
    }

    likeBtnListener() {
        if (!this._buttonHeart.classList.contains('place__button-heart_active')) {
            this._api.
            likesAdd(this._data)
                .then((res) => {
                    this._buttonHeart.classList.add('place__button-heart_active');
                    this._amountCard.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this._api.
            likesRemove(this._data)
                .then((res) => {
                    this._buttonHeart.classList.remove('place__button-heart_active');
                    this._amountCard.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    _setEventListeners() {
        this._buttonHeart.addEventListener('click', this.likeBtnListener);
        this._removeButton.addEventListener('click', this.deleteCard);
        this._placePicture.addEventListener('click', this._handleCardClick);
    }
    _checkLike() {

        const result = this._data.likes.some((resident) => {
            return resident._id == this._user._id
        })
        return result
    }

    generate() {

        this._placesMain = document.querySelector(this._cardSelector).content;
        this._newPlace = this._placesMain.querySelector('.place').cloneNode(true);
        this._placePicture = this._newPlace.querySelector('.place__picture');
        this._removeButton = this._newPlace.querySelector('.place__remove');
        this._placeName = this._newPlace.querySelector('.place__name');
        this._buttonHeart = this._newPlace.querySelector('.place__button-heart');
        this._amountCard = this._newPlace.querySelector('.place__counter-heart');
        this._placeName.textContent = this._data.name
        this._placePicture.src = this._data.link
        this._amountCard.textContent = this._data.likes.length;
        this._checkBasketDelete()
        this._setEventListeners()
            //console.log(this._buttonHeart)
        if (this._data.owner._id != this._user._id) {
            this._removeButton.style.display = 'none';
        }
        if (this._checkLike()) {
            this._buttonHeart.classList.add('place__button-heart_active');
        }
        return this._newPlace

    }
}
//======================================================
/*
import { openPopup } from './modal.js';
import { deleteCard, likesAdd, likesRemove, } from './api.js';
export const placesList = document.querySelector('.places__list');
export function startCards(arrayCard, data) {
    arrayCard.reverse();
    arrayCard.forEach(element => {
        checkLike(element.likes, data);
        element = addPlace(element, placesList, data);
        return element
    });
}

import { PopupWithImage } from './Popup.js';

const popupBigPlace = new PopupWithImage('#popupBigPlace');


function reaturePlaces(data, user) {
    const placesMain = document.querySelector('#newplaces').content;
    const newPlace = placesMain.querySelector('.place').cloneNode(true);
    const placePicture = newPlace.querySelector('.place__picture');


    const removeButton = newPlace.querySelector('.place__remove');
    const placeName = newPlace.querySelector('.place__name');
    const buttonHeart = newPlace.querySelector('.place__button-heart');
    const amountCard = newPlace.querySelector('.place__counter-heart');
    placePicture.setAttribute('src', data.link);
    placePicture.setAttribute('alt', data.name);
    placeName.textContent = data.name;
    amountCard.textContent = data.likes.length;
    removeButton.addEventListener('click', function() {
        deleteCard(data)
            .then(() => {
                newPlace.remove();
            })
            .catch((err) => {
                console.log(err);
            })
    });

    if (data.owner._id != user._id) {
        removeButton.style.display = 'none';
    }

    buttonHeart.addEventListener('click', function() {
        if (!buttonHeart.classList.contains('place__button-heart_active')) {
            likesAdd(data)
                .then((res) => {;
                    buttonHeart.classList.add('place__button-heart_active');
                    amountCard.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            likesRemove(data)
                .then((res) => {
                    buttonHeart.classList.remove('place__button-heart_active');
                    amountCard.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });

    popupBigPlace.setEventListeners('#closeBigPicture');


    placePicture.addEventListener('click', function() {
        chengeBigPlace(data, document.querySelector('#bigPicturePlace'), document.querySelector('#bigPictureName'));
        // openPopup(popupBigPlace);
        popupBigPlace.open({ imgSrcUrl: data.link, namePlaceText: data.name, imgSelector: '#bigPicturePlace', textImgSelector: '#bigPictureName' })
    });
    return newPlace;
};

function chengeBigPlace(data, elementPicture, elementText) {
    elementPicture.setAttribute('src', data.link);
    elementPicture.setAttribute('alt', data.name);
    elementText.textContent = data.name;
}

export function addPlace(data, container, user) {
    const place = reaturePlaces(data, user);
    renderLikes(place, data.likes, user)
    container.prepend(place);
};

function checkLike(likesArray, user) {

    const result = likesArray.some((resident) => {
        return resident._id == user._id
    })
    return result
}

function renderLikes(DOMelement, likesArray, user) {
    if (checkLike(likesArray, user)) {
        DOMelement.querySelector('.place__button-heart').classList.add('place__button-heart_active');
    }
}*/