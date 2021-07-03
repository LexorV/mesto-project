/**Button **/
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('#ProfileButtonSave');
const buttonCloseProfile = document.querySelector('#buttonCloseProfile');
const buttonClosePlace  =document.querySelector('#buttonClosePlace');
const placeButtonHeart = document.querySelectorAll('.place__button-heart');
const popupButtonAdd = document.querySelector('.profile__button-add');
/** container **/
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupNewPlace = document.querySelector('#popupEditPlace');
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
buttonCloseProfile.addEventListener('click' , function(){
    popupEditProfile.classList.remove('popup_opened');
});

popupButtonSave.addEventListener('click', function(){
    ProfileName.textContent = newNameProfile.value;
    ProfileDescription.textContent = newBusyProfile.value;
    popupEditProfile.classList.remove('popup_opened');
});
popupButtonAdd.addEventListener('click' , function(){
    popupNewPlace.classList.add('popup_opened');
})
buttonClosePlace.addEventListener('click' , function(){
    popupNewPlace.classList.remove('popup_opened');
});
