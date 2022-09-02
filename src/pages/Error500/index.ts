import Block from '../../utils/Block';
import template from './Error500.pug';
import { Button } from '../../components/Button';
import styles from './Error500.scss';



interface Error500Props {
    title: string;
}

export class Error500Page extends Block {
    constructor(props: Error500Props) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
