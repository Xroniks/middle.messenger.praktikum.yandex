import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputArea } from '../../components/InputArea';
import { Input } from '../../components/Input';
import { InputAreaBlock } from '../../components/InputAreaBlock';

import template from './Registration.pug';
import styles from './Registration.scss';



interface RegistrationPageProps {
    title: string;
}

export class RegistrationPage extends Block {
    constructor(props: RegistrationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Зарегистрироваться',
                href: '/src/pages/Authorization/Authorization.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            }),
            new Button({
                label: 'Войти',
                href: '/src/pages/Error500/Error500.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Ваше имя',
                nameInput: 'name',
                type: 'text',
                placeholderText: 'Имя',
            }),
            new InputAreaBlock({
                nameInputText: 'Ваша фамилия',
                nameInput: 'lastname',
                type: 'text',
                placeholderText: 'Фамилия',
            }),
            new InputAreaBlock({
                nameInputText: 'Ваш номер телефона',
                nameInput: 'tel',
                type: 'tel',
                placeholderText: 'Телефон',
            }),
            new InputAreaBlock({
                nameInputText: 'Адрес вашей почты',
                nameInput: 'mail',
                type: 'text',
                placeholderText: 'Почта',
            }),
            new InputAreaBlock({
                nameInputText: 'Введите логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Логин',
            }),
            new InputAreaBlock({
                nameInputText: 'Введите пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Пароль',
            }),
            new InputAreaBlock({
                nameInputText: 'Повторите пароль ещё раз',
                nameInput: 'repeatPassword',
                type: 'password',
                placeholderText: 'Повторите пароль',
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
