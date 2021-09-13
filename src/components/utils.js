import { closePopup } from './modal.js';
const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');
const profileName = document.querySelector('#profileName');
const profileDescription = document.querySelector('#profileDescription');

export function initinalProfile(name, about, avatar) {
    profileName.textContent = name
    profileDescription.textContent = about;
}

export function saveNamePersonal(popap) {
    profileName.textContent = newNameProfile.value;
    profileDescription.textContent = newBusyProfile.value;
    sendProfile(profileName.textContent, profileDescription.textContent)
    closePopup(popap);
};

function sendProfile(text, about, avatar) {
    fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: text,
            about: about,
        })
    });
}