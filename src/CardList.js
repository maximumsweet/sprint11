// Класс для хранения и отрисовки карточек
class CardList {
    constructor(container, createCard) {
        this.container = container;
        this.createCard = createCard;
    }

    addCard(elem) {
        const cardElement = this.createCard(elem);
        cardElement.create(elem);
        this.container.appendChild(cardElement.container);
        cardElement.listener();
    }

    render(cardsArr) {
        cardsArr.forEach((elem) => {
            this.addCard(elem);
        });
    }
}