import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputAreaBlock } from '../../components/InputAreaBlock';
import template from './ChangingUserInformation.pug';
import styles from './ChangingUserInformation.scss';
import img from '../../../static/img/avatar.jpg'

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

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Имя',
                nameInput: 'name',
                type: 'text',
                placeholderText: 'Ваше имя',
                validation: '^[0-9\+][0-9]{9,15}'
            }),
            new InputAreaBlock({
                nameInputText: 'Фамилия',
                nameInput: 'lastname',
                type: 'text',
                placeholderText: 'Ваша фамилия',
                validation: '^[0-9\+][0-9]{9,15}'
            }),
            new InputAreaBlock({
                nameInputText: 'Телефон',
                nameInput: 'tel',
                type: 'text',
                placeholderText: 'Ваш номер телефона',
                validation: '^[0-9\+][0-9]{9,15}'
            }),
            new InputAreaBlock({
                nameInputText: 'Почта',
                nameInput: 'mail',
                type: 'text',
                placeholderText: 'Адрес вашей почты',
                validation: '^[0-9\+][0-9]{9,15}'
            }),
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'password',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: '^[0-9\+][0-9]{9,15}'
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img: img, styles });
    }
}
