import API, { PasswordUp, UserAPI, UserSearch, UserUpData } from "../api/UserAPI";
import Router from "../utils/Router";
import store from "../utils/store";

class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async profile(data: UserUpData) {
        try {

            await this.api.profile(data);
            Router.go('/settings')

        } catch (e: any) {
            console.error(e.message);
        }
    }

    async avatar(data: FormData) {
        try {

            const avatar = await this.api.avatar(data);
            store.set('user', avatar)

        } catch (e: any) {
            console.error(e.message);
        }
    }

    async password(data: PasswordUp) {
        try {

            await this.api.password(data);
            Router.go('/settings')

        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser(id: string) {
        try {

            const user = await this.api.read(id);
            store.set('user', user);

        } catch (e: any) {
            console.error(e.message);
        }
    }

    async search(login: UserSearch) {
        try {

            await this.api.search(login);

        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new UserController();