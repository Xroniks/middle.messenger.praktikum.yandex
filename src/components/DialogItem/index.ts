import Block from '../../utils/Block';
import template from './DialogItem.pug';
import styles from './DialogItem.scss';
import img from '../../../static/img/avatarTest.jpg';

interface DialogItemProps {
    NameDialog: string;
    message: string;
    time: string;
    counterMessage: number;

}

export default class DialogItem extends Block {
    constructor(props: DialogItemProps) {
        super('div', props);
        this.element?.classList.add('componentDialogItem');
    }

    render() {
        return this.compile(template, { ...this.props, styles, img });
    }
}
