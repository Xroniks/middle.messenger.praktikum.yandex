import API, { PasswordUp, UserAPI, UserSearch, UserUpData } from "../api/UserAPI";
import Router from "../utils/Router";
import store from "../utils/store";

export class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async profile(data: UserUpData) {
        await this.api.profile(data);
    }

    async avatar(data: FormData) {
        const avatar = await this.api.avatar(data);
        store.set('user', avatar)
    }

    async password(data: PasswordUp) {
        await this.api.password(data);

        Router.go('/ProfileInformation')
    }

    async fetchUser(id: string) {
        const user = await this.api.read(id);

        store.set('user', user);
    }

    async search(login: UserSearch) {
        await this.api.search(login);
    }
}

export default new UserController();