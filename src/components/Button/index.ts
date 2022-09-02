import Block from '../../utils/Block';
import template from './button.pug';
import styles from './button.scss';

interface ButtonProps {
    label: string;
    events: {
        click: () => void;
    };
    href: string;
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('a', props);
        this.element!.classList.add('linkButton');
        this.element!.setAttribute('href', props.href)
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
