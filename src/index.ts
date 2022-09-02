import { HomePage } from './pages/Home';
import { AuthorizationPage } from './pages/Authorization';
import { ChangingPasswordPage } from './pages/ChangingPassword';
import { ChangingUserInformationPage } from './pages/ChangingUserInformation';
import { ProfileInformationPage } from './pages/ProfileInformation';
import { Error404Page } from './pages/Error404';
import { Error500Page } from './pages/Error500';
import { ChatPage } from './pages/Chat';
import { RegistrationPage } from './pages/Registration';


window.addEventListener('DOMContentLoaded', () => {

    const root = document.querySelector('#app')!;
    const path = document.location.pathname;
    console.log(path);

    switch (path) {
        case '/': {
            const homePage = new HomePage({ title: 'Home page2' });
            root.append(homePage.getContent()!);
            homePage.dispatchComponentDidMount();
            break
        }
        case '/src/pages/Error500/Error500.pug': {
            const error500Page = new Error500Page({ title: 'Ошибка 500' });
            root.append(error500Page.getContent()!);
            error500Page.dispatchComponentDidMount();
            break
        }

        case '/src/pages/Error404/Error404.pug': {
            const error404Page = new Error404Page({ title: 'Ошибка 404' });
            root.append(error404Page.getContent()!);
            error404Page.dispatchComponentDidMount();
            break
        }

        case '/src/pages/Authorization/Authorization.pug': {
            const authorizationPage = new AuthorizationPage({ title: 'МОЙ ЧАТ' });
            root.append(authorizationPage.getContent()!);
            authorizationPage.dispatchComponentDidMount();
            break
        }

        case '/src/pages/ChangingPassword/ChangingPassword.pug': {
            const сhangingPasswordPage = new ChangingPasswordPage({ title: 'Павел' });
            root.append(сhangingPasswordPage.getContent()!);
            сhangingPasswordPage.dispatchComponentDidMount();
            break
        }

        case '/src/pages/ChangingUserInformation/ChangingUserInformation.pug': {
            const changingUserInformationPage = new ChangingUserInformationPage({ title: 'Павел' });
            root.append(changingUserInformationPage.getContent()!);
            changingUserInformationPage.dispatchComponentDidMount();
            break
        }

        case '/src/pages/ProfileInformation/ProfileInformation.pug': {
            const profileInformationPage = new ProfileInformationPage({ title: 'Павел' });
            root.append(profileInformationPage.getContent()!);
            profileInformationPage.dispatchComponentDidMount();
            break
        }

        case '/src/pages/Chat/Chat.pug': {
            const chatPage = new ChatPage({ title: '' });
            root.append(chatPage.getContent()!);
            chatPage.dispatchComponentDidMount();
            break
        }

        case '/src/pages/Registration/Registration.pug': {
            const registrationPage = new RegistrationPage({ title: 'Регистрация' });
            root.append(registrationPage.getContent()!);
            registrationPage.dispatchComponentDidMount();
            break
        }
    }

});
