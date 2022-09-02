import Block from '../../utils/Block';
import template from './inputArea.pug';
import styles from './inputArea.scss';

interface InputAreaProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
}

export class InputArea extends Block {
    constructor(props: InputAreaProps) {
        super('label', props);
        this.element!.classList.add('inputAreaLabel');
        this.element!.setAttribute('for', props.nameInput)
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
