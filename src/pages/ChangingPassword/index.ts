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
                nameInputText: 'Старый пароль',
                nameInput: 'passwordOld',
                type: 'password',
                placeholderText: 'Введите ваш старый пароль',
                validation: '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}'
            }),
            new InputAreaBlock({
                nameInputText: 'Новый пароль',
                nameInput: 'passwordNew',
                type: 'password',
                placeholderText: 'Введите новый пароль',
                validation: '(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9a-zа-яёA-ZА-ЯЁ!@#$%^&*]{8,40}'
            })
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img: img, styles });
    }
}
