import Block from '../../utils/Block';
import Link from '../../components/Link';
import DialogItem from '../../components/DialogItem';
import template from './Chat.pug';
import styles from './Chat.scss';
import InputAreaBlock from '../../components/InputAreaBlock';
import img from '../../../static/img/avatar.jpg';
import test from '../../../static/img/test.jpg';

interface ChatPageProps {
    title: string;
}

export default class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    init() {
        this.children.buttonBlockProfile = [
            new Link({
                label: 'Мой профиль',
                href: 'ProfileInformation',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.buttonNameChat = [
            new Link({
                label: 'Название чата',
                href: '#',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];
        this.children.buttonSettingsChat = [
            new Link({
                label: 'Настройки',
                href: '#',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.buttonMessageSend = [
            new Link({
                label: 'Отправить',
                href: '#',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.dialogItem = [
            new DialogItem({
                NameDialog: "Диалог №1",
                message: "Я про тебя всё знаю!!!!!!!!!!!!!!",
                time: "17:03",
                counterMessage: 23,
            }),
            new DialogItem({
                NameDialog: "Диалог №2",
                message: "Разные сообщения тестим",
                time: "19:03",
                counterMessage: 3,
            }),
            new DialogItem({
                NameDialog: "Диалог №3",
                message: "Как вы думаете, я сдам?",
                time: "12:12",
                counterMessage: 5,
            }),
            new DialogItem({
                NameDialog: "Диалог №4",
                message: "Очень надеюсь, что сдам",
                time: "13:13",
                counterMessage: 11,
            }),
            new DialogItem({
                NameDialog: "Диалог №5",
                message: "Я устал очень!))",
                time: "12:43",
                counterMessage: 121,
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

        this.children.inputAreaBlocMessageChat = [
            new InputAreaBlock({
                nameInputText: '',
                nameInput: 'message',
                type: 'text',
                placeholderText: 'Введите сообщение',
                // eslint-disable-next-line no-useless-escape
                validation: '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$',
            }),
        ];

        this.children.buttonBlockMenu = [
            new Link({
                label: 'Войти',
                href: 'Authorization',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Зарегистрироваться',
                href: 'Registration',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Ошибка 404',
                href: 'Error404',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Ошибка 500',
                href: 'Error500',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles, img, test });
    }
}
