import Block from '../../utils/Block';
import { withStore } from '../../utils/store';
import Messages from '../Messeges';
import template from './DialogMessages.pug';

const styles = require('./DialogMessages.scss');

interface BasseDialogMessagesProps {
  mesages: Record<string, any>;
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
        Message: mesage.content,
        who: this.props.id === mesage.user_id
      }))
    }

    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export default withUser(BasseDialogMessages);