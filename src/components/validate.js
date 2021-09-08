export function activeValidForm(form) {
    const formList = Array.from(form.querySelectorAll('.popup__field'));
    const errorMassageList = Array.from(form.querySelectorAll('.popup__formError'));
    const buttonSave = form.querySelector('.popup__button-save');
    let number = 0;
    formList.forEach((el) => {
        let errorMassage = errorMassageList[number];
        el.addEventListener('input', function() {
            checkValidInput(el, errorMassage);
            toggleButtonState(formList, buttonSave);
        });
        number = number + 1;
    })
}


function toggleButtonState(inputList, button) {
    if (hasInvalidInput(inputList)) {
        button.classList.remove('popup__button-save_active');
        button.setAttribute('disabled', '');
    } else {
        button.classList.add('popup__button-save_active');
        button.removeAttribute('disabled', '');
    }
}

function checkValidInput(inputElement, errorMassageEl) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorMassageEl);
    } else {
        hideInputError(inputElement, errorMassageEl);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function showInputError(inputElement, errorMassageEl) {
    errorMassageEl.classList.add('popup__formError_active');
    errorMassageEl.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__field_error');
}

function hideInputError(inputElement, errorMassageEl) {
    errorMassageEl.classList.remove('popup__formError_active');
    inputElement.classList.remove('popup__field_error');
    errorMassageEl.textContent = '';
}