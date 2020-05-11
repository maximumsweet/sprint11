// Класс для работы с данными пользователя
export default class UserInfo {
    constructor(title, subtitle) {
        this.title = title;
        this.subtitle = subtitle;
        this.titleValue;
        this.subtitleValue;
    }

    setUserInfo(userInfo) {
        this.titleValue = userInfo.name;
        this.subtitleValue = userInfo.about;
        this.updateUserInfo(userInfo);
    }

    updateUserInfo(userInfo) {
        this.title.textContent = userInfo.name;
        this.subtitle.textContent = userInfo.about;
    }

    getUserInfo() {
        return {
            name: this.title.textContent,
            about: this.subtitle.textContent
        } 
    }
}