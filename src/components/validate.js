export function activeValidForm(form, object) {
    const contInputList = Array.from(form.querySelectorAll(object.inputBox));
    const buttonSave = form.querySelector(object.submitButtonSelector);
    const formList = Array.from(form.querySelectorAll(object.inputSelector));
    contInputList.forEach((el) => {
        const inputForm = el.querySelector(object.inputSelector);
        const errorMassage = el.querySelector(object.errorMassage);
        el.addEventListener('input', function() {
            checkValidInput(inputForm, errorMassage, object);
            toggleButtonState(formList, buttonSave, object);
        });
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