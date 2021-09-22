const token = '1898bf9a-848d-4e76-8628-36735272cef2';
const urlServ = 'https://nomoreparties.co/v1/plus-cohort-1/';

export function sendCard(nameCard, url) {
    return fetch(`${urlServ}cards`, {
            method: 'POST',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameCard,
                link: url
            })
        })
        .then(checkData)
        .then((res) => {
            return res.json()
        })
};
export function getCards() {
    return fetch(`${urlServ}cards`, {
            headers: {
                authorization: token,
            }
        })
        .then(checkData)
        .then(res => res.json())

}
export function getNameData() {
    return fetch(`${urlServ}users/me`, {
            headers: {
                authorization: token,
            }
        })
        .then(checkData)
        .then(res => res.json())
}

export function deleteCard(card) {
    return fetch(`${urlServ}cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
            }
        })
        .then(checkData)
}
export function likesAdd(card) {
    return fetch(`${urlServ}cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: token,
            }
        })
        .then(checkData)
        .then((res) => {
            return res.json()
        })
};
export function likesRemove(card) {
    return fetch(`${urlServ}cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
            }
        })
        .then(checkData)
        .then((res) => {
            return res.json()
        })
}
export function sendNamePersonal(profileName, profileDescription) {
    return fetch(`${urlServ}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: profileName,
                about: profileDescription,
            })
        })
        .then(checkData)
        .then((res) => {
            return res.json()
        })
};
export function sendAvatarPersonal(avatarUrl) {
    return fetch(`${urlServ}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            })
        })
        .then(checkData)
        .then((res) => {
            return res.json()
        })
}
const checkData = (res) => {
    if (res.ok) {
        return res
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}