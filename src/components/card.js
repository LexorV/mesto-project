export class Card {
    constructor({ data, handleCardClick, user }, cardSelector) {
        this._data = data;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
        this.currCardIsLiked = !!data.likes.find(likeObj => likeObj._id === user._id)

        this._placesMain = document.querySelector(cardSelector).content;
        this._newPlace = this._placesMain.querySelector('.place').cloneNode(true);
        this._placePicture = this._newPlace.querySelector('.place__picture');
        this._removeButton = this._newPlace.querySelector('.place__remove');
        this._placeName = this._newPlace.querySelector('.place__name');
        this._buttonHeart = this._newPlace.querySelector('.place__button-heart');
        this._amountCard = this._newPlace.querySelector('.place__counter-heart');

        this._handleCardClick = this._handleCardClick.bind(this);
        this.likeBtnListener = this.likeBtnListener.bind(this);
        this._likeCard = this._likeCard.bind(this);
        this.__unlikeCard = this._unlikeCard(this);

    }

    deleteCard() {
        console.log("card delete")
            // this.api.deleteCard(this._data)
            //     .then(() => {
            //         this._newPlace.remove();
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
    }

    _likeCard() {
        this._buttonHeart.classList.add('place__button-heart_active')
        this.currCardIsLiked = true;
    }

    _unlikeCard() {
        this._buttonHeart.classList.remove('place__button-heart_active')
        this.currCardIsLiked = false;
    }

    likeBtnListener() {
        if (this.currCardIsLiked) this._unlikeCard()
        else this._likeCard()
    }

    _setEventListeners() {
        this._buttonHeart.addEventListener('click', this.likeBtnListener)
        this._removeButton.addEventListener('click', this.deleteCard)
        this._placePicture.addEventListener('click', this._handleCardClick)
    }


    generate() {
        this._placeName.textContent = this._data.name
        this._placePicture.src = this._data.link

        this._setEventListeners();
    }
}
//======================================================
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
}