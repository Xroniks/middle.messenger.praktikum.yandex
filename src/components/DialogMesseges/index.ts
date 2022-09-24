import AuthController from '../../controllers/AuthController';
import ChatController from '../../controllers/ChatController';
import Block from '../../utils/Block';
import store, { withStore } from '../../utils/store';
import Messages from '../Messeges';
import template from './DialogMessages.pug';
import styles from './DialogMessages.scss';

interface BasseDialogMessagesProps {

}

class BasseDialogMessages extends Block<BasseDialogMessagesProps> {
  constructor(props: BasseDialogMessagesProps) {
    super('div', props);
    this.element!.classList.add('blockMessageItem');
  }

  async componentDidMount(): Promise<void> {

    if (this.props.activeChat.id) {

      const user = await AuthController.getUser();
      const token: any = await ChatController.getTokenChat(this.props.activeChat.id);
      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${this.props.activeChat.id}/${token.token}`);

      socket.addEventListener('open', () => {
        // eslint-disable-next-line
        console.log('Соединение установлено');

        socket.send(JSON.stringify({
          content: '0',
          type: 'get old',
        }));

        socket.send(JSON.stringify({
          content: 'Моё первое сообщение миру!',
          type: 'message',
        }));
        // socket.send(JSON.stringify({
        //   content: 'Моё ВТОРОЕ сообщение миру!',
        //   type: 'message',
        // }));
      });

      socket.addEventListener('message', event => {
        // eslint-disable-next-line
        console.log('Получено сообщение', JSON.parse(event.data));
        const { mesages } = store.getState();
        const data = JSON.parse(event.data);
        store.set('mesages', [...(mesages || []), ...(Array.isArray(data) ? data : [data])])
      });
    }
  }

  render() {

    if (this.props.mesages) {

      this.children.Messages = this.props.mesages.map((mesage: any) => new Messages({
        Message: mesage.mesage
      }))
    }

    return this.compile(template, { ...this.props, styles });
  }
}

const withDialogMessages = withStore(state => ({ mesages: [...(state.mesages || [])] }))
const withDialogMessagesActiv = withStore(state => ({ activeChat: { ...state.activeChat }, }))
export default withDialogMessagesActiv(withDialogMessages(BasseDialogMessages));
