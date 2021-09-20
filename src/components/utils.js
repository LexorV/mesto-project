const profileName = document.querySelector('#profileName');
const profileDescription = document.querySelector('#profileDescription');
const avatarPicture = document.querySelector('.profile__avatar');

export function initinalProfile(name, about, avatar) {
    profileName.textContent = name;
    profileDescription.textContent = about;
    avatarPicture.setAttribute('src', avatar);
}
export function saveNamePersonal(name, busy) {
    profileName.textContent = name;
    profileDescription.textContent = busy;
}
export function saveAvatarPersonal(newAvatarInput) {
    avatarPicture.setAttribute('src', newAvatarInput);
}