let formTemp;
export function openPopup(form) {
    formTemp = form;
    form.classList.add('popup_opened');
    document.addEventListener('keydown', handleESC);
}
export function closePopup(form) {
    form.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleESC);
}

function handleESC(evt) {
    if (evt.key === 'Escape') {
        closePopup(formTemp);
    };
}


export function setPopupCloseEventListeners() {
    const popapAll = Array.from(document.querySelectorAll('.popup'));
    popapAll.forEach((el) => {
        el.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                closePopup(el);
            }
        });
    })
}