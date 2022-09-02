import Block from '../../utils/Block';
import template from './Chat.pug';
import { Button } from '../../components/Button';
import styles from './Chat.scss';



interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        super('div', props);
    }


    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
