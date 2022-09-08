import Block from '../../utils/Block';
import Button from '../../components/Button';
import ProfileInformationItem from '../../components/ProfileInformationItem';
import template from './ProfileInformation.pug';
import styles from './ProfileInformation.scss';
import img from '../../../static/img/avatar.jpg';

interface ProfileInformationPageProps {
    title: string;
}

export default class ProfileInformationPage extends Block {
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
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Button({
                label: 'Изменить пароль',
                href: '/src/pages/ChangingPassword/ChangingPassword.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Button({
                label: 'Выйти',
                href: '/src/pages/Chat/Chat.pug',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}
