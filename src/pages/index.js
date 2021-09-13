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


editPlaceForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newNamePlace = document.querySelector('#newNamePlace').value;
    const newPicturePlace = document.querySelector('#newPicturePlace').value;
    const newCardsArray = {
        name: newNamePlace,
        link: newPicturePlace
    };
    addPlace(newCardsArray, placesList);
    cleanerForm(editPlaceForm);
    closePopup(popupNewPlace);
});
//new
fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
        headers: {
            authorization: "1898bf9a-848d-4e76-8628-36735272cef2",
        }
    })
    .then(res => res.json())
    .then((result) => {
        initinalProfile(result.name, result.about);
    });
fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
        headers: {
            authorization: "1898bf9a-848d-4e76-8628-36735272cef2",
        }
    })
    .then(res => res.json())
    .then((res) => {
        startCards(res);
    });
fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
        authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
    })
});


closeBigPicture.addEventListener('click', function() {
    closePopup(popupBigPlace);
    //ClosePopap(popupBigPlace);
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