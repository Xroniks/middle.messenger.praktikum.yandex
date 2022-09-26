import HTTPTransport from "../utils/HTTPTransport";

export interface SigninData {
    login: string;
    password: string;
}

export interface SignupData {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export interface SingupReturn {
    id: number;
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
}

export class AuthAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport('/auth');
    }

    signin(data: SigninData): Promise<User> {
        return this.http.post('/signin', data);
    }

    signup(data: SignupData): Promise<SingupReturn> {
        return this.http.post('/signup', data);
    }

    read(): Promise<User> {
        return this.http.get('/user');
    }

    logout(): Promise<void> {
        return this.http.post('/logout');
    }

    create = undefined;

    update = undefined;

    delete = undefined;
}

export default new AuthAPI();