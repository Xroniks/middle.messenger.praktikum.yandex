import API, { AuthAPI, SigninData, SignupData } from "../api/AuthAPI";

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        await this.api.signin(data);
    }

    async signup(data: SignupData) {
        await this.api.signup(data);
    }

    async fetchUser() {
        return this.api.read();
    }

    async logout() {
        await this.api.logout();
    }
}

export default new AuthController();