import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
    constructor(popapSlector, handleSubmit) {
        super(popapSlector)
        this._form = this._popup.querySelector(".popup__container-form");
        this._inputs = this._form.querySelectorAll(".popup__field");
        this._handleSubmit = handleSubmit;
    }

    _getInputvalues() {
        // this._inputValues = Array.from(this._form.querySelectorAll(".popup__field")).map(el => el.value);
        this._inpitsValue = {};
        this._inputs.forEach(
            (input) => (this._inpitsValue[input.name] = input.value)
        );

        return this._inpitsValue;
    }
    setInputsValues(data) {
        this._inputs.forEach((input) => {
            data.forEach((item) => {
                if (item.inputName === input.name) input.value = item.value;
            });
        });
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            this._handleSubmit(evt, this._form.querySelector(".popup__button-save"));
        });
    }
    getFormDomEl() {
            return this._form;
        }
        // this._formValue = {}
        // this._inputList.forEach((element) => {
        //     this._formValue[element] = element.value;
        //     {name:'Jak'}
        // })

    close() {
        super.close();
        this._form.reset();
    }
}