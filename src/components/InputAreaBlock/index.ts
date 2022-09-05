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
}

export class InputAreaBlock extends Block {

    private error: string;

    constructor(props: InputAreaBlockProps) {
        super('div', props);
        this.error = '';
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
                click: () => console.log('clicked'),
            },
            onError: (error) => {
                debugger;
                this.error = error;
                this.dispatchComponentDidMount();
            }
        })
    }



    render() {
        return this.compile(template, { ...this.props, styles, error: this.error });
    }

}