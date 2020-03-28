class Api {
    constructor(options) {
        this.options = options;
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'GET',
            headers: this.options.headers
        })
        .then((res) => {
            /*
                Можно лучше: проверка ответа сервера и преобразование из json
                дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                    _getResponseData(res) {
                        if (!res.ok) {
                            return Promise.reject(`Ошибка: ${res.status}`); 
                        }
                        return res.json();
                    }
                Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
                не используется вне класса Api   
            */
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    setCards(nameValue, linkValue) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    deleteCards(idValue) {
        return fetch(`${this.options.baseUrl}/cards/${idValue}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    setProfile() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.options.headers
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    updateProfile(nameValue, aboutValue) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    setLike(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            method: 'PUT',
            headers: this.options.headers
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }
}