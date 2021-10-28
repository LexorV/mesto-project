export class FormValidator {
    constructor(configs, form) {
        this._configs = configs;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._configs.inputSelector));
        this._submitBtn = this._form.querySelector(this._configs.submitButtonSelector);
        this._errorMassageList = Array.from(this._form.querySelectorAll(this._configs.errorMassage));
    }
    activeValidForm() {
        let number = 0;
        this._inputList.forEach((el) => {
            let errorMassage = this._errorMassageList[number];
            el.addEventListener('input', function() {
                this._checkValidInput(el, errorMassage, this._configs);
                this._toggleButtonState(this._inputList, this._submitBtn, this._configs);
            }.bind(this));
            number = number + 1;
        })
    }
    _toggleButtonState(inputList, button, object) {
        if (this._hasInvalidInput(inputList)) {
            button.classList.remove(object.inactiveButtonClass);
            button.setAttribute('disabled', '');
        } else {
            button.classList.add(object.inactiveButtonClass);
            button.removeAttribute('disabled', '');
        }
    }
    _checkValidInput(inputElement, errorMassageEl, object) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorMassageEl, object);
        } else {
            this._hideInputError(inputElement, errorMassageEl, object);
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    _showInputError(inputElement, errorMassageEl, object) {
        errorMassageEl.classList.add(object.inputErrorClass);
        errorMassageEl.textContent = inputElement.validationMessage;
        inputElement.classList.add(object.errorClass);
    }
    _hideInputError(inputElement, errorMassageEl, object) {
        errorMassageEl.classList.remove(object.inputErrorClass);
        inputElement.classList.remove(object.errorClass);
        errorMassageEl.textContent = '';
    }
}