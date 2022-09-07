import Block from '../../utils/Block';
import { Button } from '../../components/Button';
import { InputAreaBlock } from '../../components/InputAreaBlock';
import template from './Authorization.pug';
import styles from './Authorization.scss';


interface AuthorizationPageProps {
    title: string;
}

export class AuthorizationPage extends Block {
    constructor(props: AuthorizationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Войти',
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
                            document.location.pathname = '/src/pages/Chat/Chat.pug'
                        } else {
                            this.props.errorForm = 'Какое-то поле введено не верно!'
                        }

                        //выводит в консоль форму типа ключ значение (Имя поля и его значение)
                        console.log(form);
                    },
                },
            }),
            new Button({
                label: 'Зарегистрироваться',
                href: '/src/pages/Registration/Registration.pug',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: '^[a-zA-Z][a-zA-Z0-9\-\_]{2,20}$'
            }),
            new InputAreaBlock({
                nameInputText: 'Пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Введите пароль',
                validation: '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}'
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
