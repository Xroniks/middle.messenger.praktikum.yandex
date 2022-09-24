/* eslint-disable no-alert */
import Block from '../../utils/Block';
import Link from '../../components/Link';
import DialogItem from '../../components/DialogItem';
import template from './Chat.pug';
import styles from './Chat.scss';
import InputAreaBlock from '../../components/InputAreaBlock';
import img from '../../../static/img/avatar.jpg';
import test from '../../../static/img/test.jpg';
import { AddUserinChatData, CreateChat, DeleteChat, GetChatsData } from '../../api/ChatAPI';
import ChatController from '../../controllers/ChatController';
import store, { withStore } from '../../utils/store';
import DialogMessages from '../../components/DialogMesseges';

interface ChatPageProps {
    title: string;
}

class ChatPage extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    componentDidMount(): void {
        const data: GetChatsData = {
            offset: 0,
            limit: 5,
            title: ''
        }
        ChatController.getChats(data)
    }

    render() {

        this.children.buttonBlockProfile = [
            new Link({
                label: 'Мой профиль',
                to: '/settings',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.buttonCreateChat = [
            new Link({
                label: 'Добавить чат',
                to: '',
                events: {
                    // eslint-disable-next-line
                    click: () => {
                        // eslint-disable-next-line no-alert
                        const sign = window.prompt('Введите название чата!');
                        if (sign) {
                            const data: CreateChat = {
                                title: sign
                            }
                            ChatController.createChat(data);
                        }
                    },
                },
            }),
        ];

        this.children.AddUserinChat = [
            new Link({
                label: 'Добавить участника',
                to: '',
                events: {
                    // eslint-disable-next-line
                    click: () => {
                        const user = window.prompt('Введите ID пользователя!');
                        const chat = window.prompt('Введите ID чата!');
                        if (user && chat) {
                            const data: AddUserinChatData = {
                                users: [Number(user)],
                                chatId: Number(chat)
                            }
                            ChatController.AddUserinChat(data);
                        }
                        // this.setProps(this.props);
                    },
                },
            }),
        ];

        this.children.buttonSettingsChat = [
            new Link({
                label: 'Удалить чат',
                to: '',
                events: {
                    // eslint-disable-next-line
                    click: () => {

                        // eslint-disable-next-line no-alert
                        const sign = window.prompt('Введите id чата который хотите удалить!');
                        const data: DeleteChat = {
                            chatId: Number(sign)
                        }
                        ChatController.deleteChat(data);
                        // this.setProps(this.props);
                    },
                },
            }),
        ];

        this.children.buttonMessageSend = [
            new Link({
                label: 'Отправить',
                to: '',
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

        this.children.DialogMessages = [
            new DialogMessages({
                textMessage: "Бло сообщений>"
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
                to: '/Authorization',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Зарегистрироваться',
                to: '/sign-up',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Ошибка 404',
                to: '/Error404',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Ошибка 500',
                to: '/Error500',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        if (this.props.chats) {

            this.children.dialogItem = this.props.chats.map((chat: any) => new DialogItem({
                NameDialog: this.props.activeChat.id === chat.id ? `${chat.title}Active` : chat.title,
                message: chat.last_message,
                time: chat.id,
                counterMessage: chat.unread_count,
                events: {
                    // eslint-disable-next-line
                    click: () => {
                        store.set('activeChat', chat)
                    },
                },
            }))
        }
        return this.compile(template, { ...this.props, styles, img, test });
    }
}

const withChat = withStore(state => ({ chats: [...(state.chats || [])] }))
const withActiveChat = withStore(state => ({ activeChat: { ...state.activeChat }, }))
export default withActiveChat(withChat(ChatPage));