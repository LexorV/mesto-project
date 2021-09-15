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

export function startCards(arrayCard) {
    arrayCard.forEach(element => {
        element = addPlace(element, placesList);
        return element
    });
}


function reaturePlaces(data) {
    console.log(data._id);
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

    if (data.owner._id != '77e5e7e45a941a78fcd646d3') {
        removeButton.style.display = 'none';
    }
    buttonHeart.addEventListener('click', function() {
        buttonHeart.classList.toggle('place__button-heart_active');
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

export function addPlace(data, container) {
    const place = reaturePlaces(data);
    container.prepend(place);
};

function deleteCard(card) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${card._id}`, {
        method: 'DELETE',
        headers: {
            authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
        }
    })
}

function likesAdd() {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: {
            authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
        }
    })
}