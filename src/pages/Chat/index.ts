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
import AuthController from '../../controllers/AuthController';
import ValidationSettings from '../../utils/Validation';

interface ChatPageProps {
    title: string;
}

class ChatPage extends Block<ChatPageProps> {
    private socket?: WebSocket;

    constructor(props: ChatPageProps) {
        super('div', props);
    }

    async componentDidMount(): Promise<void> {
        const datachats: GetChatsData = {
            offset: 0,
            limit: 5,
            title: ''
        }
        ChatController.getChats(datachats)
    }

    componentDidUpdate(_oldProps: any, _newProps: any): boolean {
        if (_newProps.activeChat.id !== _oldProps.activeChat.id && this.socket) {
            this.socket = undefined;
            // to do Закрыть предидущий сокет
        }
        if (_newProps.activeChat.id && !this.socket) {
            (async () => {

                store.set('mesages', []);
                const user = await AuthController.getUser();
                const token: any = await ChatController.getTokenChat(_newProps.activeChat.id);
                this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${_newProps.activeChat.id}/${token.token}`);

                this.socket.addEventListener('open', () => {
                    console.log('Соединение установлено');

                    if (this.socket) {

                        this.socket.send(JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }));
                    }

                });

                this.socket.addEventListener('message', event => {
                    try {
                        console.log('Получено сообщение', JSON.parse(event.data));
                        const { mesages } = store.getState();
                        const data = JSON.parse(event.data);
                        store.set('mesages', [...(mesages || []), ...(Array.isArray(data) ? data : [data])])
                    } catch (e: any) {
                        console.error(e.message);
                    }
                });
            })()
        }
        return true

    }

    render() {

        this.children.buttonBlockProfile = [
            new Link({
                label: 'Мой профиль',
                to: '/settings',
                events: {
                    click: () => { },
                },
            }),
        ];

        this.children.buttonCreateChat = [
            new Link({
                label: 'Добавить чат',
                to: '',
                events: {
                    click: () => {
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
                    click: () => {
                        const user = window.prompt('Введите ID пользователя!');
                        const chat = window.prompt('Введите ID чата!');
                        if (user && chat) {
                            const data: AddUserinChatData = {
                                users: [Number(user)],
                                chatId: Number(chat)
                            }
                            ChatController.addUserinChat(data);
                        }
                    },
                },
            }),
        ];

        this.children.buttonSettingsChat = [
            new Link({
                label: 'Удалить чат',
                to: '',
                events: {
                    click: () => {
                        const sign = window.prompt('Введите id чата который хотите удалить!');
                        const data: DeleteChat = {
                            chatId: Number(sign)
                        }
                        ChatController.deleteChat(data);
                    },
                },
            }),
        ];

        this.children.buttonMessageSend = [
            new Link({
                label: 'Отправить',
                to: '',
                events: {
                    click: () => {
                        const message = (this.children.inputAreaBlocMessageChat as InputAreaBlock).getValue();
                        console.log(message)
                        if (this.socket) {
                            this.socket.send(JSON.stringify({
                                content: message,
                                type: 'message',
                            }));
                        }
                    },
                },
            }),
        ];

        this.children.inputAreaBlockChat = [
            new InputAreaBlock({
                nameInputText: '',
                nameInput: 'searchChat',
                type: 'text',
                placeholderText: 'Название чата',
                validation: ValidationSettings('message'),
            }),
        ];

        this.children.DialogMessages = [
            new DialogMessages({
                mesages: this.props.mesages

            }),
        ];

        this.children.inputAreaBlocMessageChat =
            new InputAreaBlock({
                nameInputText: '',
                nameInput: 'message',
                type: 'text',
                placeholderText: 'Введите сообщение',
                validation: ValidationSettings('message'),
            })

        this.children.buttonBlockMenu = [
            new Link({
                label: 'Войти',
                to: '/Authorization',
                events: {
                    click: () => { },
                },
            }),
            new Link({
                label: 'Зарегистрироваться',
                to: '/sign-up',
                events: {
                    click: () => { },
                },
            }),
            new Link({
                label: 'Ошибка 404',
                to: '/Error404',
                events: {
                    click: () => { },
                },
            }),
            new Link({
                label: 'Ошибка 500',
                to: '/Error500',
                events: {
                    click: () => { },
                },
            }),
        ];

        if (this.props.chats) {

            this.children.dialogItem = this.props.chats.map((chat: any) => new DialogItem({
                NameDialog: this.props.activeChat.id === chat.id ? `${chat.title}Active` : chat.title,
                message: 'Последнее сообщение',
                time: chat.id,
                counterMessage: chat.unread_count,
                events: {
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
const withDialogMessages = withStore(state => ({ mesages: [...(state.mesages || [])] })
)
export default withDialogMessages(withActiveChat(withChat(ChatPage)));