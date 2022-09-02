import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import template from './Chat.pug';
import styles from './Chat.scss';

interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    init() {
        this.children.buttonBlockProfile = [
            new Button({
                label: 'Мой профиль',
                href: '/src/pages/ProfileInformation/ProfileInformation.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];

        this.children.buttonBlockMenu = [
            new Button({
                label: 'Войти',
                href: '/src/pages/Authorization/Authorization.pug',
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
            }),
            new Button({
                label: 'Ошибка 404',
                href: '/src/pages/Error404/Error404.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            }),
            new Button({
                label: 'Ошибка 500',
                href: '/src/pages/Error500/Error500.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
