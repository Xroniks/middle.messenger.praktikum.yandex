import AuthorizationPage from './pages/Authorization';
import ChangingPasswordPage from './pages/ChangingPassword';
import ChangingUserInformationPage from './pages/ChangingUserInformation';
import ProfileInformationPage from './pages/ProfileInformation';
import Error404Page from './pages/Error404';
import Error500Page from './pages/Error500';
import ChatPage from './pages/Chat';
import RegistrationPage from './pages/Registration';
import Router from './utils/Router';

enum Routes {
    Index = '/',
    Authorization = '/Authorization',
    Register = '/Registration',
    Profile = '/ProfileInformation',
    ChangingPassword = '/ChangingPassword',
    ChangingUserInformation = '/ChangingUserInformation',
    Chat = '/Chat',
    Error500 = '/Error500',
    Error404 = '/Error404'
}


window.addEventListener('DOMContentLoaded', () => {
    Router
        .use(Routes.Index, AuthorizationPage)
        .use(Routes.Authorization, AuthorizationPage)
        .use(Routes.Register, RegistrationPage)
        .use(Routes.Profile, ProfileInformationPage)
        .use(Routes.ChangingPassword, ChangingPasswordPage)
        .use(Routes.ChangingUserInformation, ChangingUserInformationPage)
        .use(Routes.Chat, ChatPage)
        .use(Routes.Error500, Error500Page)
        .use(Routes.Error404, Error404Page)
        .start();
}
)


// window.addEventListener('DOMContentLoaded', () => {
//     const root = document.querySelector('#app');
//     const path = document.location.pathname;
//     if (root != null) {
//         switch (path) {
//             case '/':
//             case '/Authorization': {
//                 const authorizationPage = new AuthorizationPage({ title: 'МОЙ ЧАТ' });
//                 root.append(authorizationPage.getContent() || '');
//                 authorizationPage.dispatchComponentDidMount();
//                 break;
//             }
//             case '/Error500': {
//                 const error500Page = new Error500Page({ title: 'Ошибка 500' });
//                 root.append(error500Page.getContent() || '');
//                 error500Page.dispatchComponentDidMount();
//                 break;
//             }

//             case '/Error404': {
//                 const error404Page = new Error404Page({ title: 'Ошибка 404' });
//                 root.append(error404Page.getContent() || '');
//                 error404Page.dispatchComponentDidMount();
//                 break;
//             }

//             case '/ChangingPassword': {
//                 const сhangingPasswordPage = new ChangingPasswordPage({ title: 'Павел' });
//                 root.append(сhangingPasswordPage.getContent() || '');
//                 сhangingPasswordPage.dispatchComponentDidMount();
//                 break;
//             }

//             case '/ChangingUserInformation': {
//                 const changingUserInformationPage = new ChangingUserInformationPage({ title: 'Павел' });
//                 root.append(changingUserInformationPage.getContent() || '');
//                 changingUserInformationPage.dispatchComponentDidMount();
//                 break;
//             }

//             case '/ProfileInformation': {
//                 const profileInformationPage = new ProfileInformationPage({ title: 'Павел' });
//                 root.append(profileInformationPage.getContent() || '');
//                 profileInformationPage.dispatchComponentDidMount();
//                 break;
//             }

//             case '/Chat': {
//                 const chatPage = new ChatPage({ title: '' });
//                 root.append(chatPage.getContent() || '');
//                 chatPage.dispatchComponentDidMount();
//                 break;
//             }

//             case '/Registration': {
//                 const registrationPage = new RegistrationPage({ title: 'Регистрация' });
//                 root.append(registrationPage.getContent() || '');
//                 registrationPage.dispatchComponentDidMount();
//                 break;
//             }

//             default: {
//                 const error404Page = new Error404Page({ title: 'Ошибка 404' });
//                 root.append(error404Page.getContent() || '');
//                 error404Page.dispatchComponentDidMount();
//                 break;
//             }
//         }
//     }
// });
