import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './ChangingUserInformation.pug';
import img from '../../../static/img/avatar.jpg';
import validate from '../../utils/forms';
import UserController from '../../controllers/UserController';
import { UserUpData } from '../../api/UserAPI';
import ValidationSettings from '../../utils/Validation';

const styles = require('./ChangingUserInformation.scss');


interface ChangingUserInformationPageProps {
    title: string;
}

export default class ChangingUserInformationPage extends Block<ChangingUserInformationPageProps> {
    constructor(props: ChangingUserInformationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Link({
                label: 'Сохранить',
                href: '/settings',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);
                        if (isValid) {
                            UserController.profile(form as UserUpData);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }
                    },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Имя',
                nameInput: 'first_name',
                type: 'text',
                placeholderText: 'Ваше имя',
                validation: ValidationSettings('first_name'),
            }),
            new InputAreaBlock({
                nameInputText: 'Фамилия',
                nameInput: 'second_name',
                type: 'text',
                placeholderText: 'Ваша фамилия',
                validation: ValidationSettings('second_name'),
            }),
            new InputAreaBlock({
                nameInputText: 'Телефон',
                nameInput: 'phone',
                type: 'text',
                placeholderText: 'Ваш номер телефона',
                validation: ValidationSettings('phone'),
            }),
            new InputAreaBlock({
                nameInputText: 'Почта',
                nameInput: 'email',
                type: 'text',
                placeholderText: 'Адрес вашей почты',
                validation: ValidationSettings('email'),
            }),
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: ValidationSettings('login'),
            }),
            new InputAreaBlock({
                nameInputText: 'Имя в чате',
                nameInput: 'display_name',
                type: 'text',
                placeholderText: 'Введите имя в чате',
                validation: ValidationSettings('display_name'),
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}
