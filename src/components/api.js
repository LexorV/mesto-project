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
        .catch((err) => {
            console.log(err);
        })
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
        .catch((err) => {
            console.log(err);
        })
}
export function likesAdd(card) {
    return fetch(`${urlServ}cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: token,
            }
        })
        .catch((err) => {
            console.log(err);
        })
};
export function likesRemove(card) {
    return fetch(`${urlServ}cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

const checkData = (res) => {
    if (res.ok) {
        return res
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}