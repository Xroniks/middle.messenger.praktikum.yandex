import Block from '../../utils/Block';
import template from './ChangingPassword.pug';
import { Button } from '../../components/Button';
import styles from './ChangingPassword.scss';



interface ChangingPasswordPageProps {
    title: string;
}

export class ChangingPasswordPage extends Block {
    constructor(props: ChangingPasswordPageProps) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
