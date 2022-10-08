import Block from '../../utils/Block';
import template from './button.pug';
import { PropsWithRouter, withRouter } from '../hocs/withRouter';

const styles = require('./button.scss');

interface LinkProps extends PropsWithRouter {
    label?: string;
    events?: {
        click: () => void;
    };
    to?: string;
}

class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super('span', props);
        this.element?.classList.add('linkButton');
        this.props.events = {
            click: () => this.navigate(),
        }
    };

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}

export default withRouter(Link);