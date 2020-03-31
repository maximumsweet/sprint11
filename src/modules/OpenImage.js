// Открытие картинки при клике по ней и закрытие
class OpenImage {
    constructor(container) {
        this.container = container;
    }

    createImage(elem) {
        const placeList = document.querySelector('.places-list');

        const imagePopup = document.createElement('div');
        imagePopup.classList.add('image');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image__container');

        const imageOpen = document.createElement('img');
        imageOpen.classList.add('image__is-opened');
        imageOpen.setAttribute('src', `${elem}`);

        const imageClosed = document.createElement('img');
        imageClosed.classList.add('image__close');
        imageClosed.setAttribute('src', './images/close.svg');

        placeList.appendChild(imagePopup);
        imagePopup.appendChild(imageContainer);
        imageContainer.appendChild(imageOpen);
        imageContainer.appendChild(imageClosed);

        imageClosed.addEventListener('click', this.closeImage);
        imagePopup.addEventListener('click', this.closeImage);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeImage();
            }
        });
    }

    closeImage() {
        const imagePopup = document.querySelector('.image');
        imagePopup.parentNode.removeChild(imagePopup);
    }
}