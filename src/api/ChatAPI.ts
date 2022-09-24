import BaseAPI from "./BaseAPI";

export interface SigninData {
    login: string;
    password: string;
}

export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export interface GetChatsData {
    offset: number;
    limit: number;
    title: string;
}

export interface AddUserinChatData {
    users: number[];
    chatId: number;
}

export interface CreateChat {
    title: string;
}
export interface DeleteChat {
    chatId: number;
}


export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats')
    }

    getTokenChat(idChat: string) {
        return this.http.post(`/token/${idChat}`);
    }

    addUser(params: AddUserinChatData) {
        return this.http.put('/users', params);
    }

    create(title: CreateChat) {
        return this.http.post('', title);
    }

    delete(chatId: DeleteChat) {
        return this.http.delete('', chatId);
    }

    read(params: GetChatsData) {
        return this.http.get('', params);
    }

    update = undefined;
}

export default new ChatAPI();