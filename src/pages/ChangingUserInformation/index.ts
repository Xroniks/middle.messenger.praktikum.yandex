import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputArea } from '../../components/InputArea';
import template from './ChangingUserInformation.pug';
import styles from './ChangingUserInformation.scss';

interface ChangingUserInformationPageProps {
    title: string;
}

export class ChangingUserInformationPage extends Block {
    constructor(props: ChangingUserInformationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Сохранить',
                href: '/src/pages/ProfileInformation/ProfileInformation.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];

        this.children.inputArea = [
            new InputArea({
                nameInputText: 'Имя',
                nameInput: 'name',
                type: 'text',
                placeholderText: 'Ваше имя',
            }),
            new InputArea({
                nameInputText: 'Фамилия',
                nameInput: 'lastname',
                type: 'text',
                placeholderText: 'Ваша фамилия',
            }),
            new InputArea({
                nameInputText: 'Телефон',
                nameInput: 'tel',
                type: 'text',
                placeholderText: 'Ваш номер телефона',
            }),
            new InputArea({
                nameInputText: 'Почта',
                nameInput: 'mail',
                type: 'text',
                placeholderText: 'Адрес вашей почты',
            }),
            new InputArea({
                nameInputText: 'Логин',
                nameInput: 'password',
                type: 'text',
                placeholderText: 'Введите логин',
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
