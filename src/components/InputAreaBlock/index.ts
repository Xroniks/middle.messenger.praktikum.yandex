import Block from '../../utils/Block';
import template from './InputAreaBlock.pug';
import styles from './InputAreaBlock.scss';
import { Input } from '../Input';

interface InputAreaBlockProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
}

export class InputAreaBlock extends Block {
    constructor(props: InputAreaBlockProps) {
        super('div', props);
    }
    init() {
        this.children.inputArea1 = new Input({
            nameInputText: this.props.nameInputText,
            nameInput: this.props.nameInput,
            type: this.props.type,
            placeholderText: this.props.placeholderText,
            id: this.props.id,
            events: {
                click: () => console.log('clicked'),
            }
        })
    }
    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
