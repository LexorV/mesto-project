export const userConfigs = [
    ".profile__name",
    ".profile__description",
    ".profile__edit-icon",
];

export const classFormObj = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_active',
    inputErrorClass: 'popup__formError_active',
    errorMassage: '.popup__formError',
    errorClass: 'popup__field_error'
}
export const apiConfigs = {
    urlServ: 'https://nomoreparties.co/v1/plus-cohort-1/',
    token: '1898bf9a-848d-4e76-8628-36735272cef2',
};
export const formIsOpened = new CustomEvent("formIsOpened");