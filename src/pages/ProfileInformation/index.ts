import Block from '../../utils/Block';
import Link from '../../components/Link';
import ProfileInformationItem from '../../components/ProfileInformationItem';
import template from './ProfileInformation.pug';
import styles from './ProfileInformation.scss';
import img from '../../../static/img/avatar.jpg';

interface ProfileInformationPageProps {
    title: string;
}

export default class ProfileInformationPage extends Block<ProfileInformationPageProps> {
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
            new Link({
                label: 'Изменить информацию',
                href: 'ChangingUserInformation',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Изменить пароль',
                href: 'ChangingPassword',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Выйти',
                href: 'Chat',
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
