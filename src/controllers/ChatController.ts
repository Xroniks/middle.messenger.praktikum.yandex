import API, { ChatAPI, CreateChat, DeleteChat, GetChatsData } from "../api/ChatAPI";
import Router from "../utils/Router";
import store from "../utils/store";

export class UserController {
    private readonly api: ChatAPI;

    constructor() {
        this.api = API;
    }

    // async profile(data: UserUpData) {
    //     await this.api.profile(data);
    // }

    // async avatar(data: FormData) {
    //     const avatar = await this.api.avatar(data);
    //     store.set('user', avatar)
    // }

    // async password(data: PasswordUp) {
    //     await this.api.password(data);

    //     Router.go('/ProfileInformation')
    // }

    async deleteChat(chatId: DeleteChat) {

        await this.api.delete(chatId);
        const data: GetChatsData = {
            offset: 0,
            limit: 5,
            title: ''
        }
        this.getChats(data);


    }

    async createChat(title: CreateChat) {

        await this.api.create(title);

        const data: GetChatsData = {
            offset: 0,
            limit: 5,
            title: ''
        }
        this.getChats(data);


    }

    async getChats(params: GetChatsData) {

        const chats = await this.api.read(params);
        store.set('chats', chats);

    }

    // async search(login: UserSearch) {
    //     await this.api.search(login);
    // }
}

export default new UserController();