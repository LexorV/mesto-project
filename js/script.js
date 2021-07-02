/**Button **/
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('.popup__button-save');
const popupCloseButton = document.querySelector('.popup__button-close');
const placeButtonHeart = document.querySelectorAll('.place__button-heart');
/** container **/
const popupEditProfile = document.querySelector('#popupEditProfile');
/**input**/
const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');

/**text **/
const ProfileName = document.querySelector('#ProfileName');
const ProfileDescription = document.querySelector('#ProfileDescription');
/** Event handler **/
profileButtonEdit.addEventListener('click', function () {
    popupEditProfile.classList.add('popup_opened');
});
popupCloseButton.addEventListener('click' , function(){
    popupEditProfile.classList.remove('popup_opened');
});

popupButtonSave.addEventListener('click', function(){
    ProfileName.textContent = newNameProfile.value;
    ProfileDescription.textContent = newBusyProfile.value;
    popupEditProfile.classList.remove('popup_opened');
});