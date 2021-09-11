import { openPopup } from './modal.js';

function reaturePlaces(data) {
    const placesMain = document.querySelector('#newplaces').content;
    const newPlace = placesMain.querySelector('.place').cloneNode(true);
    const placePicture = newPlace.querySelector('.place__picture');
    const removeButton = newPlace.querySelector('.place__remove');
    const placeName = newPlace.querySelector('.place__name');
    const buttonHeart = newPlace.querySelector('.place__button-heart');
    placePicture.setAttribute('src', data.link);
    placePicture.setAttribute('alt', data.name);
    placeName.textContent = data.name;
    removeButton.addEventListener('click', function() {
        newPlace.remove();
    });
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