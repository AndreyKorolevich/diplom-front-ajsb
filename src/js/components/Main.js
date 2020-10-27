import Input from "./Input";
import Message from "./Message";

export default class Main {
  constructor(store) {
    this.store = store;
    this.containerMessages = document.querySelector('.article');
    this.message = new Message(this.containerMessages, this.store);
    this.input = new Input(store);

    this.start = this.start.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  start() {
    this.message.start();
    this.input.start();
  }

  rerender() {
    this.message.start();
  }


}
