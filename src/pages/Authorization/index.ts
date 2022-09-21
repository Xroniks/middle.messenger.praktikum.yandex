import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './Authorization.pug';
import styles from './Authorization.scss';
import { validate } from '../../utils/forms';
// eslint-disable-next-line import/no-named-as-default
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';


interface AuthorizationPageProps {
    title: string;
}

// eslint-disable-next-line no-useless-escape
const validationLogin: string = '^[a-zA-Z][a-zA-Z0-9\-\_]{2,20}$';
const validationPassword: string = '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}';


export default class AuthorizationPage extends Block<AuthorizationPageProps> {
    constructor(props: AuthorizationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Link({
                label: 'Войти',
                to: '',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);

                        // если все поля прошли валидацию переходить на страничку дальше, если нет то выводить сообщение о ошибке
                        if (isValid) {
                            // console.log('Ничего не произошло')
                            // this.props.router.go('Chat');
                            // document.location.pathname = 'Chat';
                            AuthController.signin(form as SignupData);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }

                        // выводит в консоль форму типа ключ значение (Имя поля и его значение)
                        // eslint-disable-next-line
                        console.log(form);
                    },
                },
            }),
            new Link({
                label: 'Зарегистрироваться',
                to: '/Registration',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: validationLogin,
            }),
            new InputAreaBlock({
                nameInputText: 'Пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Введите пароль',
                validation: validationPassword,
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
