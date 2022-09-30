import Block from '../../utils/Block';
import template from './Messages.pug';

const styles = require('./Messages.scss');

interface MessagesProps {
  Message: string;
}

export default class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super('div', props);
    this.element!.classList.add('message1');
  }

  render() {

    return this.compile(template, { ...this.props, styles });

  }
}
