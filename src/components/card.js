export default class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._selector = cardSelector;
    }
    _getPlaces() {
        const placesMain = document
            .querySelector(this._selector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return placesMain
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
    placePicture.addEventListener('click', function() {
        chengeBigPlace(data, document.querySelector('#bigPicturePlace'), document.querySelector('#bigPictureName'));
        openPopup(popupBigPlace);
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