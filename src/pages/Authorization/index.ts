import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputAreaBlock } from '../../components/InputAreaBlock';
import template from './Authorization.pug';
import styles from './Authorization.scss';


interface AuthorizationPageProps {
    title: string;
}

export class AuthorizationPage extends Block {
    constructor(props: AuthorizationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Войти',
                href: '/src/pages/Chat/Chat.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            }),
            new Button({
                label: 'Зарегистрироваться',
                href: '/src/pages/Registration/Registration.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: '^[0-9\+][0-9]{9,15}'
            }),
            new InputAreaBlock({
                nameInputText: 'Пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Введите пароль',
                validation: '^[0-9\+][0-9]{9,15}'
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
