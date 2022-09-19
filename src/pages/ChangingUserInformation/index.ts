import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './ChangingUserInformation.pug';
import styles from './ChangingUserInformation.scss';
import img from '../../../static/img/avatar.jpg';
import { validate } from '../../utils/forms';

interface ChangingUserInformationPageProps {
    title: string;
}

// eslint-disable-next-line no-useless-escape
const validationFirstLastName: string = '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$';
// eslint-disable-next-line no-useless-escape
const validationPhone: string = '^[0-9\+][0-9]{9,15}';
// eslint-disable-next-line no-useless-escape
const validationMail: string = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])';
// eslint-disable-next-line no-useless-escape
const validationLogin: string = '^[a-zA-Z][a-zA-Z0-9\-\_]{2,20}$';

export default class ChangingUserInformationPage extends Block<ChangingUserInformationPageProps> {
    constructor(props: ChangingUserInformationPageProps) {
        super('div', props);
    }


    init() {
        this.children.button = [
            new Link({
                label: 'Сохранить',
                href: '/ProfileInformation',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);

                        // если все поля прошли валидацию переходить на страничку дальше, если нет то выводить сообщение о ошибке
                        if (isValid) {
                            // document.location.pathname = '/src/pages/ProfileInformation/ProfileInformation.pug';
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }

                        // выводит в консоль форму типа ключ значение (Имя поля и его значение)
                        // eslint-disable-next-line
                        console.log(form);
                    },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Имя',
                nameInput: 'name',
                type: 'text',
                placeholderText: 'Ваше имя',
                validation: validationFirstLastName,
            }),
            new InputAreaBlock({
                nameInputText: 'Фамилия',
                nameInput: 'lastname',
                type: 'text',
                placeholderText: 'Ваша фамилия',
                validation: validationFirstLastName,
            }),
            new InputAreaBlock({
                nameInputText: 'Телефон',
                nameInput: 'tel',
                type: 'text',
                placeholderText: 'Ваш номер телефона',
                validation: validationPhone,
            }),
            new InputAreaBlock({
                nameInputText: 'Почта',
                nameInput: 'mail',
                type: 'text',
                placeholderText: 'Адрес вашей почты',
                validation: validationMail,
            }),
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'password',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: validationLogin,
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}
