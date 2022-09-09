import Block from '../../utils/Block';
import Button from '../../components/Button';
import HTTPTransport from '../../utils/HTTPTransport';
import InputAreaBlock from '../../components/InputAreaBlock';

import template from './Registration.pug';
import styles from './Registration.scss';

interface RegistrationPageProps {
    title: string;
    errorForm?: string;
}

export default class RegistrationPage extends Block {
    constructor(props: RegistrationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Зарегистрироваться',
                href: '/src/pages/Authorization/Authorization.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Button({
                label: 'Войти',
                href: '#',
                events: {
                    click: () => {
                        const inputs = this.children.inputAreaBlock as InputAreaBlock[];

                        // собирает все значения в полях в форму (которую потом будет выводить)
                        const form: Record<string, any> = {};
                        inputs.forEach((element) => {
                            form[element.getName()] = element.getValue();
                        });

                        // ещё раз проверяет у всех полей была ли пройдена валидация
                        let chek = true;
                        inputs.forEach((element) => {
                            if (!element.getValidationCheck()) {
                                chek = false;
                            }
                        });

                        // если все поля прошли валидацию переходить на страничку дальше, если нет то выводить сообщение о ошибке
                        if (chek) {
                            document.location.pathname = '/src/pages/Chat/Chat.pug';
                        } else {
                            this.props.errorForm = 'Какое-то поле введено не верно!';
                        }

                        // выводит в консоль форму типа ключ значение (Имя поля и его значение)
                        // eslint-disable-next-line
                        console.log(form);

                        // пробую отправить форму постзапросом
                        HTTPTransport.post('/api/form/save', { data: form });
                    },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Ваше имя',
                nameInput: 'name',
                type: 'text',
                placeholderText: 'Имя',

                // eslint-disable-next-line no-useless-escape
                validation: '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$',
            }),
            new InputAreaBlock({
                nameInputText: 'Ваша фамилия',
                nameInput: 'lastname',
                type: 'text',
                placeholderText: 'Фамилия',
                // eslint-disable-next-line no-useless-escape
                validation: '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$',
            }),
            new InputAreaBlock({
                nameInputText: 'Ваш номер телефона',
                nameInput: 'tel',
                type: 'tel',
                placeholderText: 'Телефон',
                // eslint-disable-next-line no-useless-escape
                validation: '^[0-9\+][0-9]{9,15}',
            }),
            new InputAreaBlock({
                nameInputText: 'Адрес вашей почты',
                nameInput: 'mail',
                type: 'text',
                placeholderText: 'Почта',
                // eslint-disable-next-line no-useless-escape
                validation: '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])',
            }),
            new InputAreaBlock({
                nameInputText: 'Введите логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Логин',
                // eslint-disable-next-line no-useless-escape
                validation: '^[a-zA-Z][a-zA-Z0-9\-\_]{2,20}$',
            }),
            new InputAreaBlock({
                nameInputText: 'Введите пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Пароль',
                validation: '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}',
            }),
            new InputAreaBlock({
                nameInputText: 'Повторите пароль ещё раз',
                nameInput: 'repeatPassword',
                type: 'password',
                placeholderText: 'Повторите пароль',
                validation: '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}',
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles, errorForm: this.props.errorForm });
    }
}
