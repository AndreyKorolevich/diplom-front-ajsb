import {v4 as uuidv4} from 'uuid';
import {addMessage} from '../reducers/reduce-message';
import {addLink} from "../reducers/reduce-media";

export default class Input {
  constructor(store) {
    this.store = store;
    this.input = document.getElementById('form-message');
  }

  start() {
    this.input.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = event.target.message.value;
      const link = value.match(/(?<![\w\-]="|">)(?<![\w\-=\#])(https?:\/\/[\w\-\.!~?&=+\*'(),\/\#\:]+)((?!\<\/\w\>))*?/);
      const result = {type: 'text', data: value, id: uuidv4()}
      addMessage(result, this.store);

      if (link) {
        addLink({type: 'link', data: link[0], idMessage: result.id, id: uuidv4()}, this.store);
      }
      event.target.message.value = '';
    });
  }
}
