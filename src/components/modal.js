export function openPopup(form) {
    form.classList.add('popup_opened');
};

export function closePopup(form) {
    form.classList.remove('popup_opened');
}

export function closePopupAll() {
    const popapAll = Array.from(document.querySelectorAll('.popup'));
    popapAll.forEach((el) => {
        document.addEventListener('keydown', function(evt) {
            if (evt.key == 'Escape') {
                closePopup(el);
            }
        })
        el.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                closePopup(el);
            }
        });
    })
}