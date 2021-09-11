import { closePopup } from './modal.js';
const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');
const profileName = document.querySelector('#profileName');
const profileDescription = document.querySelector('#profileDescription');

export function initinalProfile() {
    newNameProfile.value = profileName.textContent;
    newBusyProfile.value = profileDescription.textContent;
}

export function saveNamePersonal(popap) {
    profileName.textContent = newNameProfile.value;
    profileDescription.textContent = newBusyProfile.value;
    closePopup(popap);
};