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
    events: {
        change: () => void,
    };
    onError?: (error: string) => void;
    setValueInput?: (value: string) => void;
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
                console.log((this.element as HTMLInputElement).value);
                console.log('asdasd123123');
            },
            blur: () => {
                const regex = new RegExp(props.validation);

                if (!regex.test((this.element as HTMLInputElement).value)) {
                    (this.element as HTMLInputElement).classList.add('invalid');

                    this.props.onError && this.props.onError('Ошибка')
                }
                if (regex.test((this.element as HTMLInputElement).value) && this.element!.classList.contains('invalid')) {
                    this.element!.classList.remove('invalid');
                    this.props.onError && this.props.onError('')
                }
            },
        }
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}