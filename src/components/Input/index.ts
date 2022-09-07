import Block from '../../utils/Block';
import template from './inputArea.pug';
import styles from './inputArea.scss';

interface InputProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
    id: string;
    validation: string;
    validationCheck: boolean;
    events: {
        change: () => void,
    };
    onError?: (error: string) => void;
    setValueInput?: (value: string) => void;
    setValidationCheck?: (value: boolean) => void;
}

export class Input extends Block {
    constructor(props: InputProps) {
        super('input', props);
        this.element!.classList.add('inputAreaWindow');
        this.element!.setAttribute('name', props.nameInput);
        this.element!.setAttribute('type', props.type);
        this.element!.setAttribute('placeholder', props.placeholderText);
        this.element!.setAttribute('id', props.nameInput);
        this.props.events = {
            change: () => {
                this.props.setValueInput && this.props.setValueInput((this.element as HTMLInputElement).value);
            },
            focus: () => {



                if (this.element!.classList.contains('invalid')) {
                    this.element!.classList.remove('invalid');
                    //this.props.onError && this.props.onError('');
                }
            },
            blur: () => {
                const regex = new RegExp(props.validation);

                if (!regex.test((this.element as HTMLInputElement).value)) {
                    (this.element as HTMLInputElement).classList.add('invalid');

                    this.props.onError && this.props.onError('В поле выше есть ошибка');
                    this.props.validationCheck = false;
                    this.props.setValidationCheck && this.props.setValidationCheck(this.props.validationCheck);
                }
                if (regex.test((this.element as HTMLInputElement).value)) {
                    if (this.element!.classList.contains('invalid')) {
                        this.element!.classList.remove('invalid');
                    }
                    this.props.onError && this.props.onError('');

                    this.props.validationCheck = true;
                    this.props.setValidationCheck && this.props.setValidationCheck(this.props.validationCheck);
                }
            },
        }
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
