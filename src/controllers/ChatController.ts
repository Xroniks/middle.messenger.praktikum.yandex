import API, { AddUserinChatData, ChatAPI, CreateChat, DeleteChat, GetChatsData } from "../api/ChatAPI";
import store from "../utils/store";

export class UserController {
    private readonly api: ChatAPI;

    constructor() {
        this.api = API;
    }

    async deleteChat(chatId: DeleteChat) {

        await this.api.delete(chatId);
        const data: GetChatsData = {
            offset: 0,
            limit: 5,
            title: ''
        }
        this.getChats(data);
    }

    async getTokenChat(idChat: string) {
        return this.api.getTokenChat(idChat);
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

    async AddUserinChat(params: AddUserinChatData) {
        await this.api.addUser(params);
    }

    async getChats(params: GetChatsData) {

        const chats = await this.api.read(params);
        store.set('chats', chats);

    }
}

export default new UserController();