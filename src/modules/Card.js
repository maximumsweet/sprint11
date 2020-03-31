// Класс, создающий карточку
export default class Card {
    constructor(cardsArr, openImageCallback, api) {
        this.api = api;
        this.cardsArr = cardsArr;
        this.name = cardsArr.name;
        this.link = cardsArr.link;
        this.id = cardsArr._id;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.openImageCallback = openImageCallback;
        this.container;
    }

    create(elem) {
        this.container = document.createElement("div");
        this.container.classList.add("place-card");

        const image = document.createElement('div');
        image.classList.add('place-card__image');
        image.setAttribute('style', `background-image: url(${elem.link})`);

        const deleteIcon = document.createElement('button');
        deleteIcon.classList.add('place-card__delete-icon');

        const description = document.createElement('div');
        description.classList.add('place-card__description');

        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        cardName.textContent = elem.name;

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('place-card__container');

        const likeIcon = document.createElement('button');
        likeIcon.classList.add('place-card__like-icon');

        const likeSum = document.createElement('p');
        likeSum.classList.add('place-card__like-sum');
        likeSum.textContent = this.cardsArr.likes.length;

        this.container.appendChild(image);
        this.container.appendChild(description);
        description.appendChild(cardName);
        description.appendChild(cardContainer);
        cardContainer.appendChild(likeIcon);
        cardContainer.appendChild(likeSum);

        /* Можно лучше: не хардкодить id, а использовать тот что возвращает сервер на запрос данных пользователя */
        if (this.cardsArr.owner._id === 'f188917b1ad0100c07be376b') {
            image.appendChild(deleteIcon);
        }
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            this.api.setLike(this.id)
                .then(() => {
                    event.target.classList.add('place-card__like-icon_liked');
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                })
        }
    }

    remove(event) {
        if (event.target.className === 'place-card__delete-icon') {
            if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
                this.api.deleteCards(this.id)
                    .then(() => {
                        this.container.parentNode.removeChild(this.container);
                    })
                    .catch((err) => {
                        console.log(`Ошибка ${err}`);
                    });
            }
        }
    }

    openImage(link) {
        this.openImageCallback(link);
    }

    listener() {
        this.container.addEventListener('click', this.like);
        this.container.addEventListener('click', this.remove);
        this.container.addEventListener('click', () => {
            if(event.target.classList.contains('place-card__image')) {
                this.openImage(this.link);
            }
        });
    }
}