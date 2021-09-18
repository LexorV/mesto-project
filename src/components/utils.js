const newNameProfile = document.querySelector('#newNameProfile');
const newBusyProfile = document.querySelector('#newBusyProfile');
const profileName = document.querySelector('#profileName');
const profileDescription = document.querySelector('#profileDescription');
const newAvatarInput = document.querySelector('#newAvatarInput');
const avatarPicture = document.querySelector('.profile__avatar');

export function initinalProfile(name, about, avatar) {
    profileName.textContent = name;
    profileDescription.textContent = about;
    avatarPicture.setAttribute('src', avatar);
}


export function saveNamePersonal() {
    profileName.textContent = newNameProfile.value;
    profileDescription.textContent = newBusyProfile.value;
    return fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: profileName.textContent,
                about: profileDescription.textContent,
            })
        })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err);
        });
};

export function saveAvatarPersonal() {
    sendProfileAvatar(newAvatarInput.value);
    avatarPicture.setAttribute('src', newAvatarInput.value);
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: newAvatarInput.value,
            })
        })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err);
        });

}

function sendProfileAvatar(avatarUrl) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: '1898bf9a-848d-4e76-8628-36735272cef2',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            })
        })
        .catch((err) => {
            console.log(err);
        });
}