import Block from '../../utils/Block';
import template from './Error404.pug';
import { Button } from '../../components/Button';
import styles from './Error404.scss';



interface Error404Props {
    title: string;
}

export class Error404Page extends Block {
    constructor(props: Error404Props) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
