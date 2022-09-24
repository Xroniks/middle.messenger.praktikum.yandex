import Block from '../../utils/Block';
import Link from '../../components/Link';
import ProfileInformationItem from '../../components/ProfileInformationItem';
import template from './ProfileInformation.pug';
import styles from './ProfileInformation.scss';
import { withStore } from '../../utils/store';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

interface ProfileInformationPageProps {
    title: string;
}

export default class ProfileInformationPage extends Block<ProfileInformationPageProps> {
    constructor(props: ProfileInformationPageProps) {
        super('div', props);
    }

    componentDidMount(): void {
        AuthController.fetchUser();
    }

    render() {
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

        this.children.buttonSendFile = new Link({
            label: 'Загрузить',
            to: '',
            events: {
                // eslint-disable-next-line
                click: () => {
                    const avatar = document.getElementById('avatar');
                    const formData = new FormData();
                    // @ts-ignore
                    formData.append('avatar', avatar.files[0]);
                    UserController.avatar(formData);
                },
            },
        })

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
                label: 'Перейти к ЧАТУ',
                to: '/messenger',
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

        const fieldsOrder = ['first_name', 'second_name', 'phone', 'email', 'login'];
        fieldsOrder.forEach((field, index) => {
            (this.children.profileInformationItem as Block<ProfileInformationPageProps>[])[index].setProps({ textProfile: this.props[field] })
        });

        return this.compile(template, { ...this.props, img: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`, styles, });
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfilePage = withUser(ProfileInformationPage);