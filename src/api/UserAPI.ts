import BaseAPI from "./BaseAPI";

export interface PasswordUp {
    oldPassword: string;
    newPassword: string;
}

export interface UserUpData {
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

export interface UserSearch {
    login: string;
}

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    profile(data: UserUpData) {
        return this.http.put('/profile', data);
    }


    avatar(file: FormData) {
        return this.http.put('/profile/avatar', file);
    }

    password(data: PasswordUp) {
        return this.http.put('/password', data);
    }

    read(id: string) {
        return this.http.get(`/${id}`);
    }

    search(login: UserSearch) {
        return this.http.post('/search', login);
    }

    create = undefined;

    update = undefined;

    delete = undefined;
}

export default new UserAPI();