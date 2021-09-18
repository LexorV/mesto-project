import { openPopup } from './modal.js';
export const placesList = document.querySelector('.places__list');
/*export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];*/

export function startCards(arrayCard, data) {
    arrayCard.forEach(element => {
        checkLike(element.likes, data);
        element = addPlace(element, placesList, data);
        return element
    });
}


function reaturePlaces(data, user) {
    // console.log(user);
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
        deleteCard(data);
        newPlace.remove();
    });

    if (data.owner._id != user._id) {
        removeButton.style.display = 'none';
    }

    buttonHeart.addEventListener('click', function() {
        if (!buttonHeart.classList.contains('place__button-heart_active')) {
            buttonHeart.classList.add('place__button-heart_active');
            likesAdd(data);
            amountCard.textContent = Number(amountCard.textContent) + 1;
        } else {
            buttonHeart.classList.remove('place__button-heart_active');
            likesRemove(data);
            amountCard.textContent = Number(amountCard.textContent) - 1;
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
    //console.log(place.querySelector('.place__button-heart'));
    renderLikes(place, data.likes, user)
        //console.log(data.likes)
        //checkLike(data, data.likes)
    container.prepend(place);
};

function deleteCard(card) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function likesAdd(card) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
            }
        })
        .catch((err) => {
            console.log(err);
        })
};

function likesRemove(card) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

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