import Block from '../../utils/Block';
import template from './Messages.pug';

const styles = require('./Messages.scss');

interface MessagesProps {
  Message: string;
  who: boolean;
}

export default class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super('div', props);
    
    this.props.who ? this.element!.classList.add('message1') : this.element!.classList.add('message2');
    console.log(this.props.who)
  }

  render() {

    return this.compile(template, { ...this.props, styles });

  }
}
