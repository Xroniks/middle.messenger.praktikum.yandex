import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputAreaBlock } from '../../components/InputAreaBlock';
import template from './ChangingPassword.pug';
import styles from './ChangingPassword.scss';
import img from './avatar.jpg'

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
            }),
            new InputAreaBlock({
                nameInputText: 'Новый пароль',
                nameInput: 'passwordNew',
                type: 'password',
                placeholderText: 'Введите новый пароль',
            })
        ];
    }

    render() {
        return this.compile(template({ img: img }), { ...this.props, styles });
    }
}
