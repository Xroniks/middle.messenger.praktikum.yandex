import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { ProfileInformationItem } from '../../components/ProfileInformationItem';
import template from './ProfileInformation.pug';
import styles from './ProfileInformation.scss';
import img from '../../../static/img/avatar.jpg'

interface ProfileInformationPageProps {
    title: string;
}

export class ProfileInformationPage extends Block {
    constructor(props: ProfileInformationPageProps) {
        super('div', props);
    }

    init() {
        this.children.profileInformationItem = [
            new ProfileInformationItem({
                textConst: 'Имя',
                textProfile: 'Павел',
            }),
            new ProfileInformationItem({
                textConst: 'Фамилия',
                textProfile: 'Постников',
            }),
            new ProfileInformationItem({
                textConst: 'Телефон',
                textProfile: '+79541171175',
            }),
            new ProfileInformationItem({
                textConst: 'Почта',
                textProfile: 'Xroniks25@gmail.com',
            }),
            new ProfileInformationItem({
                textConst: 'Логин',
                textProfile: 'Xroniks',
            }),
        ];


        this.children.button = [
            new Button({
                label: 'Изменить информацию',
                href: '/src/pages/ChangingUserInformation/ChangingUserInformation.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            }),
            new Button({
                label: 'Изменить пароль',
                href: '/src/pages/ChangingPassword/ChangingPassword.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            }),
            new Button({
                label: 'Выйти',
                href: '/src/pages/Chat/Chat.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img: img, styles });
    }
}
