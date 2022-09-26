import API, { AuthAPI, SigninData, SignupData } from "../api/AuthAPI";
import Router from "../utils/Router";
import store from "../utils/store";

class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);
            await this.fetchUser();
            Router.go('/settings')
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);
            await this.fetchUser();
            Router.go('/settings')
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser() {
        try {
            const user = await this.api.read();
            store.set('user', user);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async getUser() {
        return this.api.read();

    }

    async logout() {
        try {
            await this.api.logout();
            Router.go('/Authorization')
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthController();