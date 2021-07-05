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
let places1 = 0;
/**text **/
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

creaturePlaces();
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
PlaceButtonSave.addEventListener('click', function(){
    const NewNamePlace = document.querySelector('#newNamePlace').value;
  const newPicturePlace = document.querySelector('#newPicturePlace').value;
  if (NewNamePlace !== '' & newPicturePlace !== '') {
  const NewCardsArray =  {
    name: NewNamePlace,
    link: newPicturePlace
  };
  initialCards.unshift(NewCardsArray);
  initialCards.pop();
  console.log(initialCards);
  const NewCards  = document.querySelector('#Newplaces').content;
  console.log(NewCards);


  popupNewPlace.classList.remove('popup_opened');
  return
}
});
  console.log(initialCards[0].name);
  function creaturePlaces(){
      const placesMain  = document.querySelector('#Newplaces').content;
      const placesList = document.querySelector('.places__list');
      for (i=0; i <= 5; i++) {
         const places = placesMain.cloneNode(true);
         places.querySelector('.place__name').textContent = initialCards[i].name;
         places.querySelector('.place__picture').src = initialCards[i].link;
         placesList.append(places);
      }

  };