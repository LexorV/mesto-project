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
import { initinalProfile, saveNamePersonal, saveAvatarPersonal } from '../components/utils.js';
import { sendCard, getCards, getNameData, sendNamePersonal, sendAvatarPersonal } from '../components/api.js';
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
const buttonCloseAvatar = document.querySelector('#buttonCloseAvatar');
/** container **/
const popupNewPlace = document.querySelector('#popupEditPlace');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupBigPlace = document.querySelector('#popupBigPlace');
const editPlaceForm = document.querySelector('#editPlaceForm');
const editProfileForm = document.querySelector('#editProfileForm');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const editAvatarForm = document.querySelector('#popupAvatarCheked');
/**input**/

/**text **/

closePopupAll();

//initinalProfile();
//new
activeValidForm(editPlaceForm, classFormObj);
activeValidForm(editProfileForm, classFormObj);
activeValidForm(editAvatarForm, classFormObj);


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
editAvatarButton.addEventListener('click', function() {
    openPopup(editAvatarForm);
})
buttonCloseAvatar.addEventListener('click', function() {
    closePopup(editAvatarForm);
});



editProfileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const profileButtonSave = document.querySelector('#profileButtonSave');
    const newNameProfile = document.querySelector('#newNameProfile').value;
    const newBusyProfile = document.querySelector('#newBusyProfile').value;
    callWaiting(profileButtonSave, 'Сохранение...')
    sendNamePersonal(newNameProfile, newBusyProfile).then(() => {
            saveNamePersonal(newNameProfile, newBusyProfile);
            cleanerForm(editProfileForm);
            closePopup(popupEditProfile);
        })
        .finally(() => {
            callWaiting(profileButtonSave, 'Сохранение');
        })
        .catch((err) => {
            console.log(err);
        });
});
editAvatarForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const saveAvatarButton = document.querySelector('#saveAvatarButton');
    const newAvatarInput = document.querySelector('#newAvatarInput').value;
    callWaiting(saveAvatarButton, 'Сохранение...')
    sendAvatarPersonal(newAvatarInput).then(() => {
            saveAvatarPersonal(newAvatarInput);
            cleanerForm(editAvatarForm);
            closePopup(editAvatarForm);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            callWaiting(saveAvatarButton, 'Сохранение');
        })
})

function callWaiting(classButton, textEdit) {
    classButton.textContent = textEdit
}

editPlaceForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newNamePlace = document.querySelector('#newNamePlace').value;
    const newPicturePlace = document.querySelector('#newPicturePlace').value;
    const placeButtonSavePlace = document.querySelector('#placeButtonSave');
    const newCardsArray = {
        name: newNamePlace,
        link: newPicturePlace
    };
    callWaiting(placeButtonSavePlace, 'Сохранение...')
    Promise.all([sendCard(newCardsArray.name, newCardsArray.link), getNameData()])
        .then(([data, user]) => {
            addPlace(data, placesList, user);
        })
        .then(() => {
            cleanerForm(editPlaceForm);
        })
        .then(() => {
            closePopup(popupNewPlace);
        })
        .finally(() => {
            callWaiting(placeButtonSavePlace, 'Сохранение')
        })
        .catch((err) => {
            console.log(err);
        })
});
Promise.all([getNameData(), getCards()]).then(([data, cards]) => {
    initinalProfile(data.name, data.about, data.avatar);
    startCards(cards, data);
})
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