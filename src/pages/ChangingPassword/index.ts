import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputAreaBlock } from '../../components/InputAreaBlock';
import template from './ChangingPassword.pug';
import styles from './ChangingPassword.scss';
import img from '../../../static/img/avatar.jpg'

interface ChangingPasswordPageProps {
    title: string;
}

export class ChangingPasswordPage extends Block {
    constructor(props: ChangingPasswordPageProps) {
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
                nameInputText: 'Старый пароль',
                nameInput: 'passwordOld',
                type: 'password',
                placeholderText: 'Введите ваш старый пароль',
                validation: '^[0-9\+][0-9]{9,15}'
            }),
            new InputAreaBlock({
                nameInputText: 'Новый пароль',
                nameInput: 'passwordNew',
                type: 'password',
                placeholderText: 'Введите новый пароль',
                validation: '^[0-9\+][0-9]{9,15}'
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img: img, styles });
    }
}
