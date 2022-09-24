import Block from '../../utils/Block';
import template from './InputAreaBlock.pug';
import styles from './InputAreaBlock.scss';
import Input from '../Input';

interface InputAreaBlockProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
    validation: string;
    validationCheck?: boolean;
    error?: string;
    value?: string;
}

export default class InputAreaBlock extends Block<InputAreaBlockProps> {
    getValue() {
        return this.props.value;
    }

    getName() {
        return this.props.nameInput;
    }

    getValidationCheck() {
        return this.props.validationCheck;
    }

    constructor(props: InputAreaBlockProps) {
        super('div', props);
        this.setProps({ validationCheck: false })
    }

    init() {
        this.children.input = new Input({
            nameInputText: this.props.nameInputText,
            nameInput: this.props.nameInput,
            type: this.props.type,
            placeholderText: this.props.placeholderText,
            id: this.props.id,
            validation: this.props.validation,
            validationCheck: this.props.validationCheck,
            events: {
                // eslint-disable-next-line
                change: () => { console.error('Не определена функция change'); },
            },
            setValueInput: (value) => {
                this.setProps({ value });
            },
            setValidationCheck: (validationCheck) => {
                this.setProps({ validationCheck });
            },
            onError: (error) => {
                this.setProps({ error });
                this.dispatchComponentDidMount();
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props, styles, error: this.props.error });
    }
}
