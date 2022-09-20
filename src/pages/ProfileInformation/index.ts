import Block from '../../utils/Block';
import Link from '../../components/Link';
import ProfileInformationItem from '../../components/ProfileInformationItem';
import template from './ProfileInformation.pug';
import styles from './ProfileInformation.scss';
import img from '../../../static/img/avatar.jpg';
import store, { StoreEvents } from '../../utils/store';

interface ProfileInformationPageProps {
    title: string;
}


export default class ProfileInformationPage extends Block<ProfileInformationPageProps> {
    constructor() {
        super('div', store.getState());
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidUpdate(oldProps: any, newProps: any) {
        const fieldsOrder = ['firstName', 'lastName'];

        fieldsOrder.forEach((field, index) => {
            (this.children.profileInformationItem as Block<ProfileInformationPageProps>[])[index].setProps({ textProfile: newProps[field] })
        });

        return true
    }

    init() {

        const { user } = store.getState();

        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState().user || {})
        })

        this.children.profileInformationItem = [
            new ProfileInformationItem({
                textConst: 'Имя',
                textProfile: user.firstName,
            }),
            new ProfileInformationItem({
                textConst: 'Фамилия',
                textProfile: user.lastName,
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
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}
