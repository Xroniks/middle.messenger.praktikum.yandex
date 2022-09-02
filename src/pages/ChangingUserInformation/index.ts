import Block from '../../utils/Block';
import template from './ChangingUserInformation.pug';
import { Button } from '../../components/Button';
import styles from './ChangingUserInformation.scss';



interface ChangingUserInformationPageProps {
    title: string;
}

export class ChangingUserInformationPage extends Block {
    constructor(props: ChangingUserInformationPageProps) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
