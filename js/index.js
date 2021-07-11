/**Button **/
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('#ProfileButtonSave');
const buttonCloseProfile = document.querySelector('#buttonCloseProfile');
const popupButtonAdd = document.querySelector('.profile__button-add');
const PlaceButtonSave = document.querySelector('#PlaceButtonSave');
const CloseBigPicture =document.querySelector('#CloseBigPicture');
/** container **/
const popupNewPlace = document.querySelector('#popupEditPlace');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupBigPlace = document.querySelector('#popupBigPlace');
/**input**/
const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');
/**text **/
const BigPlaceList = document.querySelector('.popup__list')
const placesList = document.querySelector('.places__list');
const ProfileName = document.querySelector('#ProfileName');
const ProfileDescription = document.querySelector('#ProfileDescription');
const BigPicturePlace = document.querySelector('#BigPicturePlace');
const BigPlacetext = document.querySelector('#BigPictureName');
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
function ChengeBigPlace(data, elementPicture, elementText){
  elementPicture.setAttribute('src', data.link);
  elementPicture.setAttribute('alt', data.name);
  elementText.textContent = data.name;
  return elementPicture, elementText
}
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
  console.log(popupBigPlace);
})
buttonClosePlace.addEventListener('click' , function(){
  ClosePopap(popupNewPlace);
});

popupButtonSave.addEventListener('click', function(){
  SaveNamePersonal();
});

PlaceButtonSave.addEventListener('click', function(){
  const NewNamePlace = document.querySelector('#newNamePlace').value;
  const newPicturePlace = document.querySelector('#newPicturePlace').value;
  if (NewNamePlace !== '' & newPicturePlace !== '') {
  while (i<999) {
    i = 0;
    const NewCardsArray =  {
      name: NewNamePlace,
      link: newPicturePlace
    };
    initialCards.unshift(NewCardsArray);
  addPlace(initialCards[i], placesList);
  i++;
  ClosePopap(popupNewPlace);
  break
  }
}});
function reaturePlaces(data) {
  const placesMain  = document.querySelector('#Newplaces').content;
  const NewPlace = placesMain.querySelector('.place').cloneNode(true);
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
  buttonHeart.addEventListener('click' , function() {
    buttonHeart.classList.toggle('place__button-heart_active');
  });
  PlacePicture.addEventListener('click' , function() {
    ChengeBigPlace(data, BigPicturePlace, BigPlacetext);
    console.log(popupBigPlace);
    OpenPopap(popupBigPlace);
  });
  return NewPlace;
};
function addPlace(data, container) {
const place = reaturePlaces(data);
container.prepend(place);
};

for (i=0; i<=5; i++) {
  addPlace(initialCards[i], placesList);
}
console.log(CloseBigPicture);
CloseBigPicture.addEventListener('click', function(){
  ClosePopap(popupBigPlace);
  //ClosePopap(popupBigPlace);
});