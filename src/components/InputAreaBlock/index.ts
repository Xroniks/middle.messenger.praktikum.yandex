import Block from '../../utils/Block';
import template from './InputAreaBlock.pug';
import styles from './InputAreaBlock.scss';
import { Input } from '../Input';

interface InputAreaBlockProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
    validation: string
    error?: string;
    value?: string;
}

export class InputAreaBlock extends Block {

    //private error: string;
    getValue() {
        return this.props.value;
    }

    getName() {
        return this.props.nameInputText
    }

    constructor(props: InputAreaBlockProps) {
        super('div', props);
        this.props.error = '';
    }

    init() {
        this.children.input = new Input({
            nameInputText: this.props.nameInputText,
            nameInput: this.props.nameInput,
            type: this.props.type,
            placeholderText: this.props.placeholderText,
            id: this.props.id,
            validation: this.props.validation,
            events: {
                change: () => console.log('clicked'),
            },
            setValueInput: (value) => {
                this.props.value = value;
                console.log(value + 'GEG')
            },
            onError: (error) => {
                this.props.error = error;
                this.dispatchComponentDidMount();
            }
        })
    }


    render() {
        return this.compile(template, { ...this.props, styles, error: this.props.error });
    }

}