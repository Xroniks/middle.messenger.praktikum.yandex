import Block from '../../utils/Block';
import Link from '../../components/Link';
import HTTPTransport from '../../utils/HTTPTransport1';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './Registration.pug';
import styles from './Registration.scss';
import { validate } from '../../utils/forms';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

interface RegistrationPageProps {
    title: string;
    errorForm?: string;
}

// eslint-disable-next-line no-useless-escape
const validationFirstLastName: string = '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$';
const validationPassword: string = '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}';
// eslint-disable-next-line no-useless-escape
const validationPhone: string = '^[0-9\+][0-9]{9,15}';
// eslint-disable-next-line no-useless-escape
const validationMail: string = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])';
// eslint-disable-next-line no-useless-escape
const validationLogin: string = '^[a-zA-Z][a-zA-Z0-9\-\_]{2,20}$';

export default class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Link({
                label: 'Зарегистрироваться',
                to: '/Authorization',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);

                        // если все поля прошли валидацию переходить на страничку дальше, если нет то выводить сообщение о ошибке
                        if (isValid) {
                            // todo Перейти на строчные буквы в url
                            AuthController.signup(form as SignupData);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }

                        // выводит в консоль форму типа ключ значение (Имя поля и его значение)
                        // eslint-disable-next-line
                        console.log(form);

                        // пробую отправить форму постзапросом
                        HTTPTransport.post('/api/form/save', { data: form });
                    },
                },
            }),
            new Link({
                label: 'Войти',
                to: '/Authorization',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Ваше имя',
                nameInput: 'first_name',
                type: 'text',
                placeholderText: 'Имя',
                // eslint-disable-next-line no-useless-escape
                validation: validationFirstLastName,
            }),
            new InputAreaBlock({
                nameInputText: 'Ваша фамилия',
                nameInput: 'second_name',
                type: 'text',
                placeholderText: 'Фамилия',
                // eslint-disable-next-line no-useless-escape
                validation: validationFirstLastName,
            }),
            new InputAreaBlock({
                nameInputText: 'Ваш номер телефона',
                nameInput: 'phone',
                type: 'tel',
                placeholderText: 'Телефон',
                // eslint-disable-next-line no-useless-escape
                validation: validationPhone,
            }),
            new InputAreaBlock({
                nameInputText: 'Адрес вашей почты',
                nameInput: 'email',
                type: 'text',
                placeholderText: 'Почта',
                // eslint-disable-next-line no-useless-escape
                validation: validationMail,
            }),
            new InputAreaBlock({
                nameInputText: 'Введите логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Логин',
                // eslint-disable-next-line no-useless-escape
                validation: validationLogin,
            }),
            new InputAreaBlock({
                nameInputText: 'Введите пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Пароль',
                validation: validationPassword,
            }),
            new InputAreaBlock({
                nameInputText: 'Повторите пароль ещё раз',
                nameInput: 'repeatPassword',
                type: 'password',
                placeholderText: 'Повторите пароль',
                validation: validationPassword,
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles, errorForm: this.props.errorForm });
    }
}
