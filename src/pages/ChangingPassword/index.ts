import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './ChangingPassword.pug';
import styles from './ChangingPassword.scss';
import img from '../../../static/img/avatar.jpg';
import { validate } from '../../utils/forms';

interface ChangingPasswordPageProps {
    title: string;
}
const validationPassword: string = '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}';

export default class ChangingPasswordPage extends Block<ChangingPasswordPageProps> {
    constructor(props: ChangingPasswordPageProps) {
        super('div', props);
    }

    init() {

        this.children.button = [
            new Link({
                label: 'Сохранить',
                href: '#',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);

                        // если все поля прошли валидацию переходить на страничку дальше, если нет то выводить сообщение о ошибке
                        if (isValid) {
                            document.location.pathname = 'ProfileInformation';
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' });
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
                nameInputText: 'Старый пароль',
                nameInput: 'passwordOld',
                type: 'password',
                placeholderText: 'Введите ваш старый пароль',
                validation: validationPassword,
            }),
            new InputAreaBlock({
                nameInputText: 'Новый пароль',
                nameInput: 'passwordNew',
                type: 'password',
                placeholderText: 'Введите новый пароль',
                validation: validationPassword,
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}
