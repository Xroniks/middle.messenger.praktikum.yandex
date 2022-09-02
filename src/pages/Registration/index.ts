import Block from '../../utils/Block';
import template from './Registration.pug';
import { Button } from '../../components/Button';
import styles from './Registration.scss';



interface RegistrationPageProps {
    title: string;
}

export class RegistrationPage extends Block {
    constructor(props: RegistrationPageProps) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
