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

    // signin(data: SigninData) {
    //     return this.http.post('/signin', data);
    // }


    // signup(data: SignupData) {
    //     return this.http.post('/signup', data);
    // }

    create(title: CreateChat) {
        return this.http.post('', title);
    }

    delete(chatId: DeleteChat) {
        return this.http.delete('', chatId);
    }

    read(params: GetChatsData) {
        return this.http.get('', params);
    }

    // logout() {
    //     return this.http.post('/logout');
    // }




    update = undefined;
}

export default new ChatAPI();