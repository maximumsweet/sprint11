// Класс для всплывающего окна формы добавления карточки
class PopupCard extends Popup {
    constructor(container, cardList, apiCards) {
        super(container.element, container.elemClose);
        this.cardList = cardList;
        this.apiCards = apiCards;
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
        this.popupTitle.textContent = 'Новое место';
        this.formTitle.setAttribute('type', 'text');
        this.formSubtitle.setAttribute('type', 'url');
        this.formTitle.setAttribute('placeholder', 'Название');
        this.formSubtitle.setAttribute('placeholder', 'Ссылка на картинку');
        this.formTitle.setAttribute('minlength', '2');
        this.formTitle.setAttribute('maxlength', '30');
        this.button.textContent = '+';
        this.button.setAttribute('disabled', true);
        this.button.setAttribute('id', 'content');
        this.button.removeAttribute('style', 'background-color: black; color: white');
    }
  
    submitHandler() {
        this.apiCards.setCards(this.formTitle.value, this.formSubtitle.value)
            .then((result) => {
                this.cardList.addCard(result);
                this.popupForm.reset();
                super.close();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }
}