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
                href: '#',
                events: {
                    click: () => {
                        const inputs = this.children.inputAreaBlock as InputAreaBlock[]

                        //собирает все значения в полях в форму (которую потом будет выводить)
                        let form: Record<string, any> = {};
                        inputs.forEach(element => {
                            form[element.getName()] = element.getValue();
                        });

                        //ещё раз проверяет у всех полей была ли пройдена валидация
                        let chek = true;
                        inputs.forEach(element => {
                            if (!element.getValidationCheck()) {
                                chek = false
                            }
                            console.log(element.getValidationCheck());
                        });

                        //если все поля прошли валидацию переходить на страничку дальше, если нет то выводить сообщение о ошибке
                        if (chek) {
                            document.location.pathname = '/src/pages/ProfileInformation/ProfileInformation.pug'
                        } else {
                            this.props.errorForm = 'Какое-то поле введено не верно!'
                        }

                        //выводит в консоль форму типа ключ значение (Имя поля и его значение)
                        console.log(form);
                    },
                },
            })
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Имя',
                nameInput: 'name',
                type: 'text',
                placeholderText: 'Ваше имя',
                validation: '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$'
            }),
            new InputAreaBlock({
                nameInputText: 'Фамилия',
                nameInput: 'lastname',
                type: 'text',
                placeholderText: 'Ваша фамилия',
                validation: '^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z\-]+$'
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
                validation: '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])'
            }),
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'password',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: '^[a-zA-Z][a-zA-Z0-9\-\_]{2,20}$'
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img: img, styles });
    }
}
