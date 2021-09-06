/**Button **/
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('#profileButtonSave');
const buttonCloseProfile = document.querySelector('#buttonCloseProfile');
const popupButtonAdd = document.querySelector('.profile__button-add');
const placeButtonSave = document.querySelector('#placeButtonSave');
const closeBigPicture = document.querySelector('#closeBigPicture');
/** container **/
const popupNewPlace = document.querySelector('#popupEditPlace');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupBigPlace = document.querySelector('#popupBigPlace');
const editPlaceForm = document.querySelector('#editPlaceForm');
const editProfileForm = document.querySelector('#editProfileForm');
/**input**/
const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');
/**text **/
const placesList = document.querySelector('.places__list');
const profileName = document.querySelector('#profileName');
const profileDescription = document.querySelector('#profileDescription');
const bigPicturePlace = document.querySelector('#bigPicturePlace');
const bigPlacetext = document.querySelector('#bigPictureName');
const initialCards = [{
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

function chengeBigPlace(data, elementPicture, elementText) {
    elementPicture.setAttribute('src', data.link);
    elementPicture.setAttribute('alt', data.name);
    elementText.textContent = data.name;
}

function openPopup(form) {
    form.classList.add('popup_opened');
};

function closePopup(form) {
    form.classList.remove('popup_opened');
}

function closePopupAll() {
    const popapAll = Array.from(document.querySelectorAll('.popup'));
    popapAll.forEach((el) => {
        document.addEventListener('keydown', function(evt) {
            if (evt.key == 'Escape') {
                closePopup(el);
            }
        })
        el.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                closePopup(el);
            }
        });
    })
}
closePopupAll();


function initinalProfile() {
    newNameProfile.value = profileName.textContent;
    newBusyProfile.value = profileDescription.textContent;
}
initinalProfile();

function saveNamePersonal() {
    profileName.textContent = newNameProfile.value;
    profileDescription.textContent = newBusyProfile.value;
    closePopup(popupEditProfile);
};
//new
function showInputError(inputElement, errorMassageEl) {
    errorMassageEl.classList.add('popup__formError_active');
    errorMassageEl.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__field_error');
}

function hideInputError(inputElement, errorMassageEl) {
    errorMassageEl.classList.remove('popup__formError_active');
    inputElement.classList.remove('popup__field_error');
    errorMassageEl.textContent = '';
}

function checkValidInput(inputElement, errorMassageEl) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorMassageEl);
    } else {
        hideInputError(inputElement, errorMassageEl);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, button) {
    if (hasInvalidInput(inputList)) {
        button.classList.remove('popup__button-save_active');
        button.setAttribute('disabled', '');
    } else {
        button.classList.add('popup__button-save_active');
        button.removeAttribute('disabled', '');
    }
}

function activeValidForm(form) {
    const formList = Array.from(form.querySelectorAll('.popup__field'));
    const errorMassageList = Array.from(form.querySelectorAll('.popup__formError'));
    const buttonSave = form.querySelector('.popup__button-save');
    let number = 0;
    formList.forEach((el) => {
        let errorMassage = errorMassageList[number];
        el.addEventListener('input', function() {
            checkValidInput(el, errorMassage);
            toggleButtonState(formList, buttonSave);
        });
        number = number + 1;
    })
}


function cleanerForm(form) {
    const formList = Array.from(form.querySelectorAll('.popup__field'));
    const buttonSave = form.querySelector('.popup__button-save');
    formList.forEach((el) => {
        el.value = '';
    })
    buttonSave.setAttribute('disabled', '');
    buttonSave.classList.remove('popup__button-save_active');
}
activeValidForm(editPlaceForm);
activeValidForm(editProfileForm);


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
    saveNamePersonal();
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
        chengeBigPlace(data, bigPicturePlace, bigPlacetext);
        openPopup(popupBigPlace);
    });
    return newPlace;
};

function addPlace(data, container) {
    const place = reaturePlaces(data);
    container.prepend(place);
};
initialCards.forEach(element => {
    element = addPlace(element, placesList);
    return element
});

closeBigPicture.addEventListener('click', function() {
    closePopup(popupBigPlace);
    //ClosePopap(popupBigPlace);
});