/**Button **/
import '../pages/index.css';
import Logo from '../images/Logo.svg';
import close_icon from '../images/close_Icon.svg';
import Jak from '../images/jak.png';
import Edit__icon from '../images/Edit__icon.svg';
import plus from '../images/plus.svg';
import basket from '../images/basket.png';
import iconHeart from '../images/Icon-heart.svg';
import { activeValidForm } from '../components/validate.js';
import { startCards, addPlace, placesList } from '../components/card.js';
import { openPopup, closePopup, closePopupAll } from '../components/modal.js';
import { initinalProfile, saveNamePersonal } from '../components/utils.js';
import { Promise } from 'core-js';
const classFormObj = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_active',
    inputErrorClass: 'popup__formError_active',
    errorMassage: '.popup__formError',
    errorClass: 'popup__field_error'
}
const whoIsTheGoat = [
    // меняем исходные пути на переменные
    { name: 'Logo', link: Logo },
    { name: 'close_Icon', link: close_icon },
    { name: 'Jak', link: Jak },
    { name: 'Edit__icon', link: Edit__icon },
    { name: 'plus', link: plus },
    { name: 'basket', link: basket },
    { name: 'iconHeart', link: iconHeart },
];
const profileButtonEdit = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('#buttonCloseProfile');
const popupButtonAdd = document.querySelector('.profile__button-add');
const closeBigPicture = document.querySelector('#closeBigPicture');
/** container **/
const popupNewPlace = document.querySelector('#popupEditPlace');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupBigPlace = document.querySelector('#popupBigPlace');
const editPlaceForm = document.querySelector('#editPlaceForm');
const editProfileForm = document.querySelector('#editProfileForm');
/**input**/

/**text **/

closePopupAll();

//initinalProfile();
//new
activeValidForm(editPlaceForm, classFormObj);
activeValidForm(editProfileForm, classFormObj);


/** Event handler **/
profileButtonEdit.addEventListener('click', function() {
    openPopup(popupEditProfile);
});
buttonCloseProfile.addEventListener('click', function() {
    closePopup(popupEditProfile);
});
popupButtonAdd.addEventListener('click', function() {
    openPopup(popupNewPlace);
});
buttonClosePlace.addEventListener('click', function() {
    closePopup(popupNewPlace);
});


editProfileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    saveNamePersonal(popupEditProfile);
    cleanerForm(editProfileForm);
});

function addPlaceForm() {

}

editPlaceForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newNamePlace = document.querySelector('#newNamePlace').value;
    const newPicturePlace = document.querySelector('#newPicturePlace').value;
    const newCardsArray = {
        name: newNamePlace,
        link: newPicturePlace
    };
    sendCard(newCardsArray.name, newCardsArray.link)
        .then((data) => {
            addPlace(data, placesList);
        });
    cleanerForm(editPlaceForm);
    closePopup(popupNewPlace);
});
//new
const token = '1898bf9a-848d-4e76-8628-36735272cef2';
const urlServ = 'https://nomoreparties.co/v1/plus-cohort-1/';

function getNameData() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
            headers: {
                authorization: token,
            }
        })
        .then(res => res.json())
}

function getCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
            headers: {
                authorization: token,
            }
        })
        .then(res => res.json())

}


Promise.all([getNameData(), getCards()]).then(([data, cards]) => {
    initinalProfile(data.name, data.about);
    startCards(cards, data);

})


/*
function getCard() {
    fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
            headers: {
                authorization: token,
            }
        })
        .then(res => res.json())
}*/


function sendCard(nameCard, url) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
            method: 'POST',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameCard,
                link: url
            })
        })
        .then((res) => {
            return res.json()
        })
};

closeBigPicture.addEventListener('click', function() {
    closePopup(popupBigPlace);
});

function cleanerForm(form) {
    const formList = Array.from(form.querySelectorAll('.popup__field'));
    const buttonSave = form.querySelector('.popup__button-save');
    formList.forEach((el) => {
        el.value = '';
    })
    buttonSave.setAttribute('disabled', '');
    buttonSave.classList.remove('popup__button-save_active');
}