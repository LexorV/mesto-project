const handleESC = (form) => (evt) => {
    if (evt.key === 'Escape') {
        closePopup(form);
    };
}
export function openPopup(form) {
    form.classList.add('popup_opened');
    document.addEventListener('keydown', handleESC(form));
};
export function closePopup(form) {
    form.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleESC(form));
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