
import Block from '../../utils/Block';
import Messages from '../Messeges';
import template from './DialogMessages.pug';

const styles = require('./DialogMessages.scss');

interface BasseDialogMessagesProps {
  mesages: Record<string, any>

}

class BasseDialogMessages extends Block<BasseDialogMessagesProps> {
  constructor(props: BasseDialogMessagesProps) {
    super('div', props);
    this.element!.classList.add('blockMessageItem');
  }

  render() {
    console.log('render')
    console.log(this.props.mesages)
    if (this.props.mesages) {
      this.children.Messages = this.props.mesages.map((mesage: any) => new Messages({
        Message: mesage.content
      }))
    }

    return this.compile(template, { ...this.props, styles });
  }
}

export default BasseDialogMessages;
