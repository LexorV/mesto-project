export default class Card {
    constructor({ data, user, api, handleCardClick }, cardSelector) {
        this._handleCardClick = handleCardClick;
        this._data = data;
        this._user = user;
        this._api = api;
        this._cardSelector = cardSelector;

        this._placesMainTemplate = document.querySelector(cardSelector).content;
        this._newPlace = this._placesMainTemplate.querySelector('.place').cloneNode(true);
        this._placePicture = this._newPlace.querySelector('.place__picture');
        this._removeButton = this._newPlace.querySelector('.place__remove');
        this._placeName = this._newPlace.querySelector('.place__name');
        this._buttonHeart = this._newPlace.querySelector('.place__button-heart');
        this._amountCard = this._newPlace.querySelector('.place__counter-heart');

        this._handleCardClick = this._handleCardClick.bind(this);
        this._likeCard = this._likeCard.bind(this);
        this._deleteCard = this._deleteCard.bind(this);
    }





    _likeCheck() {
        const userId = this._user._id;
        const result = this._data.likes.some((resident) => {
            return resident._id == this._user._id
        })
        return result
    }

    _renderLikes() {
        if (checkLike()) {
            this._buttonHeart.classList.add('place__button-heart_active');
        }
    }
    deleteCard() {
        this._api.deleteCard(this._data)
            .then(() => {
                this._newPlace.remove();
            })
            .catch((err) => {
                console.log(err);
            })
    }



    _setEventListeners() {
        this._buttonHeart.addEventListener('click', this._renderLikes)
        this._removeButton.addEventListener('click', this._deleteCard)
        this._placePicture.addEventListener('click', this._handleCardClick);

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
    }

    // _getPlace() {
    //     const placesMain = document
    //         .querySelector(this._cardSelector)
    //         .content
    //         .querySelector('.place')
    //         .cloneNode(true);
    //     return placesMain
    // }

    generate() {
        // this._element = this._getPlace();

        this._placeName.textContent = data.name;
        this._placePicture.src = data.link;
        this._placePicture.alt = data.name;
        this._amountCard.textContent = data.likes.length;


        this._setEventListeners();


        // this._element.newPlace.querySelector('.place__remove');
        // this._element.newPlace.querySelector('.place__name').textContent = data.name;
        // this._element.this._newPlace.querySelector('.place__button-heart');
        // this._amountCard = this._newPlace.querySelector('.place__counter-heart').textContent =  data.likes.length;

        // this._element.this._newPlace.querySelector('.place__button-heart').addEventListener(;)

        // this._setEventListeners();
    }
}

let currUser;

fetch('./user').then((user) => currUser = user)

const card = new Card({ data: { link: "", name: "" }, user: currUser }, "#card");


if (card._likeCheck()) {
    // render active likes
} else {
    // render inactive likes
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
import { data } from 'autoprefixer';

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