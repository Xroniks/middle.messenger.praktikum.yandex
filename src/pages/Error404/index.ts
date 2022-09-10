import Block from '../../utils/Block';
import Button from '../../components/Button';
import template from './Error404.pug';
import styles from './Error404.scss';

interface Error404Props {
    title: string;
}

export default class Error404Page extends Block {
    constructor(props: Error404Props) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Перейти обратно в ЧАТ',
                href: 'Chat',
                events: {
                    // eslint-disable-next-line
                    click: () => { },
                },
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
