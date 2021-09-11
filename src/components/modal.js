export function openPopup(form) {
    form.classList.add('popup_opened');
    document.addEventListener('keydown', function(evt) {
        if (evt.key == 'Escape') {
            closePopup(form);
        }
    })
};

export function closePopup(form) {
    form.classList.remove('popup_opened');
    document.removeEventListener('keydown', function(evt) {
        if (evt.key == 'Escape') {
            closePopup(form);
        }
    })
}

export function closePopupAll() {
    const popapAll = Array.from(document.querySelectorAll('.popup'));
    popapAll.forEach((el) => {
        el.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                closePopup(el);
            }
        });
    })
}