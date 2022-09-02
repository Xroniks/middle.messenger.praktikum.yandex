import Block from '../../utils/Block';
import template from './ProfileInformation.pug';
import { Button } from '../../components/Button';
import styles from './ProfileInformation.scss';



interface ProfileInformationPageProps {
    title: string;
}

export class ProfileInformationPage extends Block {
    constructor(props: ProfileInformationPageProps) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
