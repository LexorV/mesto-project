export function activeValidForm(form, object) {
    const formList = Array.from(form.querySelectorAll(object.inputSelector));
    const errorMassageList = Array.from(form.querySelectorAll(object.errorMassage));
    const buttonSave = form.querySelector(object.submitButtonSelector);
    let number = 0;
    formList.forEach((el) => {
        let errorMassage = errorMassageList[number];
        el.addEventListener('input', function() {
            checkValidInput(el, errorMassage, object);
            toggleButtonState(formList, buttonSave, object);
        });
        number = number + 1;
    })
}


function toggleButtonState(inputList, button, object) {
    if (hasInvalidInput(inputList)) {
        button.classList.remove(object.inactiveButtonClass);
        button.setAttribute('disabled', '');
    } else {
        button.classList.add(object.inactiveButtonClass);
        button.removeAttribute('disabled', '');
    }
}

function checkValidInput(inputElement, errorMassageEl, object) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorMassageEl, object);
    } else {
        hideInputError(inputElement, errorMassageEl, object);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function showInputError(inputElement, errorMassageEl, object) {
    errorMassageEl.classList.add(object.inputErrorClass);
    errorMassageEl.textContent = inputElement.validationMessage;
    inputElement.classList.add(object.errorClass);
}

function hideInputError(inputElement, errorMassageEl, object) {
    errorMassageEl.classList.remove(object.inputErrorClass);
    inputElement.classList.remove(object.errorClass);
    errorMassageEl.textContent = '';
}