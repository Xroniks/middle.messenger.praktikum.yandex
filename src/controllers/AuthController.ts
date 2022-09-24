import API, { AuthAPI, SigninData, SignupData } from "../api/AuthAPI";
import Router from "../utils/Router";
import store from "../utils/store";

class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        await this.api.signin(data);
        await this.fetchUser();
        Router.go('/settings')
    }

    async signup(data: SignupData) {
        await this.api.signup(data);
        await this.fetchUser();
        Router.go('/settings')
    }

    async fetchUser() {
        const user = await this.api.read();
        store.set('user', user);
    }

    async getUser() {
        return this.api.read();

    }

    async logout() {
        await this.api.logout();
        Router.go('/Authorization')
    }
}

export default new AuthController();