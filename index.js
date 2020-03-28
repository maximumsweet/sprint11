// Объявление переменных и навешивание слушателей
const mainModule = (function () {
    const form = document.forms.newCard;
    const userInfo = document.querySelector('.user-info');

    const createCard = (...args) => new Card(...args, openImage.createImage.bind(openImage), api);
    const cardList = new CardList(document.querySelector('.places-list'), createCard);
    const popup = new Popup(document.querySelector('.popup'), document.querySelector('.popup__close'));
    const validateForm = new FormValidator(document.forms.newCard);
    const infoAboutUser = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'));
    const openImage = new OpenImage(document.querySelector('.root'));

    const api = new Api({
        baseUrl: 'http://95.216.175.5/cohort8',
        headers: {
            authorization: '9f37db10-74c5-4b85-b9cd-ea5999c50582',
            'Content-Type': 'application/json'
        }
    });

    const popupEdit = new PopupEdit(popup, infoAboutUser, api);
    const popupCard = new PopupCard(popup, cardList, api);

    userInfo.addEventListener('click', (event) => {
        if (event.target.classList.contains('user-info__edit-button')) {
            popupEdit.open();
        }

        if (event.target.classList.contains('user-info__button')) {
            popupCard.open();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (event.target.elements.button === document.querySelector('#content')) {
            popupCard.submitHandler()
        }

        if (event.target.elements.button === document.querySelector('#edit')) {
            popupEdit.submitHandler()
        }
    });

    validateForm.setEventListeners(form);

    api.getInitialCards()
        .then((result) => {
            cardList.render(result);
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        });

    api.setProfile()
        .then((result) => {
            infoAboutUser.updateUserInfo(result);
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        });
}());