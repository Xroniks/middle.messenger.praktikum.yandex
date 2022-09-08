import Block from '../../utils/Block';
import Button from '../../components/Button';
import template from './Chat.pug';
import styles from './Chat.scss';
import InputAreaBlock from '../../components/InputAreaBlock';

interface ChatPageProps {
    title: string;
}

export default class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    init() {
        this.children.buttonBlockProfile = [
            new Button({
                label: 'Мой профиль',
                href: '/src/pages/ProfileInformation/ProfileInformation.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.inputAreaBlockChat = [
            new InputAreaBlock({
                nameInputText: '',
                nameInput: 'searchChat',
                type: 'text',
                placeholderText: 'Название чата',
                // eslint-disable-next-line no-useless-escape
                validation: '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$',
            }),
        ];

        this.children.buttonBlockMenu = [
            new Button({
                label: 'Войти',
                href: '/src/pages/Authorization/Authorization.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Button({
                label: 'Зарегистрироваться',
                href: '/src/pages/Registration/Registration.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Button({
                label: 'Ошибка 404',
                href: '/src/pages/Error404/Error404.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Button({
                label: 'Ошибка 500',
                href: '/src/pages/Error500/Error500.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
