import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputArea } from '../../components/InputArea';
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
                href: 'https://vk.com/ads?act=office&union_id=1600191398',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];
        this.children.inputArea = [
            new InputArea({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Введите логин',
            }),
            new InputArea({
                nameInputText: 'Пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Введите пароль',
            })
        ];
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
