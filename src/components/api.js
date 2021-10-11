// ====================================================================

export class Api {
    constructor({ token, urlServ }) {
        this._token = token;
        this._urlServ = urlServ;

        this._checkData = this._checkData.bind(this);
    }

    _checkData(res) {
        if (res.ok) {
            return res
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    sendCard(nameCard, url) {
        return fetch(`${this._urlServ}cards`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameCard,
                    link: url
                })
            })
            .then((this._checkData))
            .then((res) => {
                return res.json()
            })
    };

    getCards() {
        const url = this._urlServ;
        const token = this._token;
        return fetch(`${url}cards`, {
                headers: {
                    authorization: token,
                }
            })
            .then(this._checkData)
            .then(res => res.json())
    }

    getNameData() {
        return fetch(`${this._urlServ}users/me`, {
                headers: {
                    authorization: this._token,
                }
            })
            .then(this._checkData)
            .then(res => res.json())
    }

    deleteCard(card) {
        return fetch(`${this._urlServ}cards/${card._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                }
            })
            .then(this._checkData)
    }

    likesAdd(card) {
        return fetch(`${this._urlServ}cards/likes/${card._id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token,
                }
            })
            .then(this._checkData)
            .then((res) => {
                return res.json()
            })
    };
    likesRemove(card) {
        return fetch(`${this._urlServ}cards/likes/${card._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                }
            })
            .then(this._checkData)
            .then((res) => {
                return res.json()
            })
    }
    sendNamePersonal(profileName, profileDescription) {
        return fetch(`${this._urlServ}users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: profileName,
                    about: profileDescription,
                })
            })
            .then(this._checkData)
            .then((res) => {
                return res.json()
            })
    };
    sendAvatarPersonal(avatarUrl) {
        return fetch(`${this._urlServ}users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatarUrl,
                })
            })
            .then(this._checkData)
            .then((res) => {
                return res.json()
            })
    }

}

// ====================================================================


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

const checkData = res => {
    if (res.ok) {
        return res
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}