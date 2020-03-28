// Класс для всплывающего окна всплывающего окна формы информации о пользователе
class PopupEdit extends Popup {
    constructor(container, infoUser, api) {
        super(container.element, container.elemClose);
        this.api = api;
        this.infoUser = infoUser;
        this.popupTitle = document.querySelector('.popup__title');
        this.popupForm = document.forms.newCard;
        this.formTitle = this.popupForm.elements.name;
        this.formSubtitle = this.popupForm.elements.link;
        this.button = this.popupForm.elements.button;
        this.spanTitle = document.querySelector('.popup__error');
        this.spanSubtitle = document.querySelector('.popup__error_pos');
    }
  
    open() {
        super.open();
        this.popupTitle.textContent = 'Редактировать профиль';
        this.formTitle.setAttribute('type', 'text');
        this.formSubtitle.setAttribute('type', 'text');
        this.formTitle.setAttribute('placeholder', 'Имя');
        this.formSubtitle.setAttribute('placeholder', 'О себе');
        this.formTitle.setAttribute('minlength', '2');
        this.formSubtitle.setAttribute('minlength', '2');
        this.formTitle.setAttribute('maxlength', '30');
        this.formSubtitle.setAttribute('maxlength', '30');
        this.button.textContent = 'Сохранить';
        this.button.setAttribute('disabled', true);
        this.button.setAttribute('id', 'edit');
        this.button.removeAttribute('style', 'background-color: black; color: white');

        const profileValue = this.infoUser.getUserInfo();
        this.formTitle.value = profileValue.name;
        this.formSubtitle.value = profileValue.about;
    }
  
    submitHandler() {
        this.api.updateProfile(this.formTitle.value, this.formSubtitle.value)
            .then((result) => {
                this.infoUser.setUserInfo(result);
                this.popupForm.reset();
                super.close();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }
}