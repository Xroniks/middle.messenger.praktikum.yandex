import HTTPTransport from "../utils/HTTPTransport";

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

export interface ProfileData {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    display_name: string;
    avatar: string;
}

export interface AvatarReturn {
    id: number,
    login: string,
    first_name: string,
    second_name: string,
    email: string,
    phone: string,
    display_name: string,
    avatar: string,
    status: any
}
export interface UserReturn {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    email: string,
    phone: string
}

export interface SearchReturn {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    email: string,
    phone: string
}

export interface UserSearch {
    login: string;
}

export class UserAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport('/user');
    }

    profile(data: UserUpData): Promise<ProfileData> {
        return this.http.put('/profile', data);
    }

    avatar(file: FormData): Promise<AvatarReturn> {
        return this.http.put('/profile/avatar', file);
    }

    password(data: PasswordUp): Promise<void> {
        return this.http.put('/password', data);
    }

    read(id: string): Promise<UserReturn> {
        return this.http.get(`/${id}`);
    }

    search(login: UserSearch): Promise<SearchReturn[]> {
        return this.http.post('/search', login);
    }

    create = undefined;

    update = undefined;

    delete = undefined;
}

export default new UserAPI();