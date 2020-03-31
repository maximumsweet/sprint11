// Класс для универсальной валидации любого поля формы
export default class FormValidator {
    constructor(form) {
        this.form = form;
    }

    checkInputValidity(event) {
        this.isValidForm = false;

        const arr = Array.from(event.currentTarget.elements).map((elem) => {
            if (elem.type !== "submit") {
                if (elem.type === "url") {
                    if (!elem.checkValidity()) {
                        const errorLink = document.querySelector(`#error-${elem.id}`);
                        errorLink.textContent = 'Здесь должна быть ссылка';
                        return true;
                    }
                }

                if (elem.type === "text" && elem.value.length === 0) {
                    const errorMessages = document.querySelector(`#error-${elem.id}`);
                    errorMessages.textContent = 'Это обязательное поле';
                    this.setSubmitButtonState(event.currentTarget.elements.button);
                    return true;
                }
    
                if (!elem.checkValidity()) {
                    const errorMessages = document.querySelector(`#error-${elem.id}`);
                    errorMessages.textContent = 'Длина должна быть от 2 до 30 символов';
                    this.setSubmitButtonState(event.currentTarget.elements.button);
                    return true;
                }

                const errorMessages = document.querySelector(`#error-${elem.id}`);
                errorMessages.textContent = '';

                return false;
            } else return false;
        });
    
        this.isValidForm = arr.some( (elem) => {
            if (elem !== false) return true;
        });
    
        if (!this.isValidForm) {
            this.isValidForm = true;
            this.setSubmitButtonState(event.currentTarget.elements.button);
        }
    }

    setSubmitButtonState(element) {
        if (this.isValidForm) {
            element.removeAttribute('disabled');
            element.setAttribute('style', 'background-color: black; color: white');
        } else {
            element.setAttribute('disabled', true);
            element.removeAttribute('style', 'background-color: black; color: white');
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', (event) => {
            this.checkInputValidity(event);
        });
    }
}