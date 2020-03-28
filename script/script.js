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

/*
    Неплохая работа, класс Api создан и он обеспечивает необходимые методы для доступа к серверу,
    отлично, что сделана дополнительная часть задания. Но по работе есть несколько замечаний:

    Надо исправить:
    - если запрос выполнился нужно возвращать отклоненный промис
    - не выполнять обработку полученных данных в классе Api, а возвращать из класса промис с данными
    и обрабатывать полученные от сервера данные или ошибку, там, где метод класса Api был вызван
    - все изменения на странице - закрытие попапа, лайк и удаление карточки, производить 
    только после того как сервер ответит подтверждением

    Можно лучше:
    - не хардкодить адрес и ключ авторизации сервера в каждом методе, а использовать те, что были переданы в конструктор
*/

/*
    Отлично, все замечания исправлены, теперь запросы к серверу осуществляются правильно

    Можно лучше:
    - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод

    - не хардкодить id пользователя в классе Card, а использовать тот что возвращает сервер на запрос данных пользователя 
    Чтобы это сделать нужно сначала запросить данные пользователя и только после этого отрисовывать карточки
    Для этого можно воспользоваться Promise.all
      https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all


   Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
        api.setProfile(),
        api.getInitialCards()
    ])    
        .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
            const [userData, initialCards] = values;
            //теперь мы знаем id пользователя и можем отрисовать карточки
        })
        .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
        })   

    Так же если у Вас будет свободное время попробуйте работу с сервером
    применив async/await для работы с асинхронными запросами.
    https://learn.javascript.ru/async-await
    https://habr.com/ru/company/ruvds/blog/414373/
    https://www.youtube.com/watch?v=SHiUyM_fFME
    Это часто используется в реальной работе     

    Успехов в дальнейшем обучении!
*/