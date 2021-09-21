export function cleanerForm(form) {
    const formList = Array.from(form.querySelectorAll('.popup__field'));
    const buttonSave = form.querySelector('.popup__button-save');
    formList.forEach((el) => {
        el.value = '';
    })
    buttonSave.setAttribute('disabled', '');
    buttonSave.classList.remove('popup__button-save_active');
}