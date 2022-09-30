import AuthorizationPage from './pages/Authorization';
import ChangingPasswordPage from './pages/ChangingPassword';
import ChangingUserInformationPage from './pages/ChangingUserInformation';
import { ProfilePage } from './pages/ProfileInformation';
import Error404Page from './pages/Error404';
import Error500Page from './pages/Error500';
import ChatPage from './pages/Chat';
import RegistrationPage from './pages/Registration';
import Router from './utils/Router';
//import AuthController from './controllers/AuthController';

enum Routes {
    Index = '/',
    Authorization = '/Authorization',
    Register = '/sign-up',
    Profile = '/settings',
    ChangingPassword = '/ChangingPassword',
    ChangingUserInformation = '/ChangingUserInformation',
    Chat = '/messenger',
    Error500 = '/Error500',
    Error404 = '/Error404'
}

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.Index, AuthorizationPage)
        .use(Routes.Authorization, AuthorizationPage)
        .use(Routes.Register, RegistrationPage)
        .use(Routes.Profile, ProfilePage)
        .use(Routes.ChangingPassword, ChangingPasswordPage)
        .use(Routes.ChangingUserInformation, ChangingUserInformationPage)
        .use(Routes.Chat, ChatPage)
        .use(Routes.Error500, Error500Page)
        .use(Routes.Error404, Error404Page)
        .start();

    // try {
    //     AuthController.fetchUser();
    //     Router.start();
    //     if (window.location.pathname === '/' || window.location.pathname === '/Authorization' || window.location.pathname === '/sign-up') {
    //         Router.go('/settings');
    //     }
    // } catch {
    //     Router.start();
    //     if (!(window.location.pathname === '/' || window.location.pathname === '/Authorization' || window.location.pathname === '/sign-up')) {
    //         Router.go('/');
    //     }

    // }
})
