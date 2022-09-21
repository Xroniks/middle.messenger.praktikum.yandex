import Block from '../../utils/Block';
import Link from '../../components/Link';
import ProfileInformationItem from '../../components/ProfileInformationItem';
import template from './ProfileInformation.pug';
import styles from './ProfileInformation.scss';
import img from '../../../static/img/avatar.jpg';
import { withStore } from '../../utils/store';
// eslint-disable-next-line import/no-named-as-default
import AuthController from '../../controllers/AuthController';

interface ProfileInformationPageProps {
    title: string;
}


export default class ProfileInformationPage extends Block<ProfileInformationPageProps> {
    constructor(props: ProfileInformationPageProps) {
        super('div', props);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidUpdate(oldProps: any, newProps: any) {
        const fieldsOrder = ['first_name', 'second_name', 'phone', 'email', 'login'];

        fieldsOrder.forEach((field, index) => {
            (this.children.profileInformationItem as Block<ProfileInformationPageProps>[])[index].setProps({ textProfile: newProps[field] })
        });

        return true
    }

    init() {

        AuthController.fetchUser();

        this.children.profileInformationItem = [
            new ProfileInformationItem({
                textConst: 'Имя',
                textProfile: this.props.first_name,
            }),
            new ProfileInformationItem({
                textConst: 'Фамилия',
                textProfile: this.props.second_name,
            }),
            new ProfileInformationItem({
                textConst: 'Телефон',
                textProfile: this.props.phone,
            }),
            new ProfileInformationItem({
                textConst: 'Почта',
                textProfile: this.props.email,
            }),
            new ProfileInformationItem({
                textConst: 'Логин',
                textProfile: this.props.login,
            }),
        ];

        this.children.button = [
            new Link({
                label: 'Изменить информацию',
                to: '/ChangingUserInformation',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Изменить пароль',
                to: '/ChangingPassword',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Выйти',
                to: '/Chat',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
            new Link({
                label: 'Выйти из аккаунта',
                to: '',
                events: {
                    // eslint-disable-next-line
                    click: () => {
                        AuthController.logout();
                    },
                },
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfilePage = withUser(ProfileInformationPage);