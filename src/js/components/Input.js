import {addMessage} from "../reducers/reduce-message";

export default class Input {
  constructor(store) {
    this.store = store;
    this.input = document.getElementById('form-message');
  }

  start() {
    this.input.addEventListener('submit', (event) => {
      event.preventDefault();
      addMessage({type: 'text', data: event.target.message.value}, this.store)
      event.target.message.value = '';
    })
  }

}
