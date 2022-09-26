enum RegInput {
    EMAIL = '^[a-z0-9._%$#+-]+@[a-z0-9]*[a-z]+\.[a-z]+$', // латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть @ и точка после нее, но перед точкой обязательно должны быть буквы
    LOGIN = '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$', // Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание
    FIRTS_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$', // латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    SECOND_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$', // латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    PHONE = '^[0-9+][0-9]{9,14}$', // от 10 до 15 символов, состоит из цифр, может начинаться с плюса
    PASSWORD = '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$', // Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра
    DISPLAY_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$', // латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    MESSAGE = '[^\s]', // не должно быть пустым
    DEFAULT = '[^\s]', // не должно быть пустым
}

export default function ValidationSettings(key: string): string {
    switch (key) {
        case 'email':
            return RegInput.EMAIL;
        case 'login':
            return RegInput.LOGIN;
        case 'first_name':
            return RegInput.FIRTS_NAME;
        case 'second_name':
            return RegInput.SECOND_NAME;
        case 'phone':
            return RegInput.PHONE;
        case 'password':
            return RegInput.PASSWORD;
        case 'passwordYet':
            return RegInput.PASSWORD;
        case 'oldPassword':
            return RegInput.PASSWORD;
        case 'newPassword':
            return RegInput.PASSWORD;
        case 'display_name':
            return RegInput.DISPLAY_NAME;
        case 'message':
            return RegInput.MESSAGE;
        default:
            return RegInput.DEFAULT;
    }
}