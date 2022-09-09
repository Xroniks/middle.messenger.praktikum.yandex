import Block from '../../utils/Block';
import Button from '../../components/Button';
import template from './Error500.pug';
import styles from './Error500.scss';

interface Error500Props {
    title: string;
}

export default class Error500Page extends Block {
    constructor(props: Error500Props) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Перейти обратно в ЧАТ',
                href: '/src/pages/Chat/Chat.pug',
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
