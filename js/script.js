/**Button **/
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('#ProfileButtonSave');
const buttonCloseProfile = document.querySelector('#buttonCloseProfile');
const buttonClosePlace  =document.querySelector('#buttonClosePlace');
const placeButtonHeart = document.querySelectorAll('.place__button-heart');
const popupButtonAdd = document.querySelector('.profile__button-add');
/** container **/
const popupNewPlace = document.querySelector('#popupEditPlace');
const popupEditProfile = document.querySelector('#popupEditProfile');
/**input**/
const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');
/**text **/
const placesList = document.querySelector('.places__list');
const ProfileName = document.querySelector('#ProfileName');
const ProfileDescription = document.querySelector('#ProfileDescription');
const initialCards = [
  {
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
];
function OpenPopap(form) {
form.classList.add('popup_opened');
};
function ClosePopap(form) {
  form.classList.remove('popup_opened');
}
function SaveNamePersonal() {
  ProfileName.textContent = newNameProfile.value;
  ProfileDescription.textContent = newBusyProfile.value;
  ClosePopap(popupEditProfile);
};

/** Event handler **/
profileButtonEdit.addEventListener('click', function () {
  OpenPopap(popupEditProfile);
});
buttonCloseProfile.addEventListener('click' , function(){
  ClosePopap(popupEditProfile);
});
popupButtonAdd.addEventListener('click' , function(){
  OpenPopap(popupNewPlace);
})
buttonClosePlace.addEventListener('click' , function(){
  ClosePopap(popupNewPlace);
});

popupButtonSave.addEventListener('click', function(){
  SaveNamePersonal();
});

function reaturePlaces(data) {
  const placesMain  = document.querySelector('#Newplaces').content;
  const NewPlace = placesMain.cloneNode(true);
  const PlacePicture = NewPlace.querySelector('.place__picture');
  const removeButton = NewPlace.querySelector('.place__remove');
  const placeName = NewPlace.querySelector('.place__name');
  const buttonHeart = NewPlace.querySelector('.place__button-heart');
  PlacePicture.setAttribute('src', data.link);
  PlacePicture.setAttribute('alt', data.name);
  placeName.textContent = data.name;
  removeButton.addEventListener('click', function(){
    console.log('test');
    NewPlace.remove();
  });
  return NewPlace;
};
function addPlace(data, container) {
const place =  reaturePlaces(data)
container.prepend(place);
};

for (i=0; i<=5; i++) {
  addPlace(initialCards[i], placesList )
}
