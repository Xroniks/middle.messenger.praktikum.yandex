import Block from '../../utils/Block';
import template from './inputArea.pug';
import styles from './inputArea.scss';

interface InputProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
    id: string;
    events: {
        click: () => void;
    };
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
            focus: () => {
                console.log((this.element as HTMLInputElement).value);
                console.log('asdasd123123');
            },
            blur: () => {

                const regex = new RegExp("^[0-9\+][0-9]{9,15}");

                if (regex.test((this.element as HTMLInputElement).value)) {
                    console.log('done')
                } else {
                    console.log('not :(')
                }
                if ((this.element as HTMLInputElement).value) {
                    (this.element as HTMLInputElement).classList.add('invalid');
                }
                if (!(this.element as HTMLInputElement).value && this.element!.classList.contains('invalid')) {
                    this.element!.classList.remove('invalid');
                }
            },
        }
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
