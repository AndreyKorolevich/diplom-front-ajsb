import Input from './Input';
import Message from './Message';
import Media from './Media';
import Login from './Login';

export default class Main {
  constructor(store) {
    this.store = store;
    this.containerMessages = document.querySelector('.article');
    this.message = new Message(this.containerMessages, this.store);
    this.input = new Input(store);
    this.media = new Media(store);
    this.login = new Login();
    this.lastMessage = null;

    this.start = this.start.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  start() {
    this.message.start();
    this.input.start();
    this.media.start();
  }

  rerender() {
    const { messages } = this.store.getState();
    const newMessage = messages[messages.length - 1];
    if (this.lastMessage !== newMessage) {
      this.message.addMessage(newMessage);
      this.lastMessage = newMessage;
    }
    this.media.start();
  }
}
