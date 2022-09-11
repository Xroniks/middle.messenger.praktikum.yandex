import Block from '../../utils/Block';
import template from './button.pug';
import styles from './button.scss';

interface LinkProps {
    label: string;
    events: {
        click: () => void;
    };
    href: string;
}

export default class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super('a', props);
        this.element?.classList.add('linkButton');
        this.element?.setAttribute('href', props.href);
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
