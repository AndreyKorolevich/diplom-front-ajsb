import {v4 as uuidv4} from 'uuid';
import {addMessage} from '../reducers/reduce-message';
import {addLink} from '../reducers/reduce-media';

export default class Input {
  constructor(store) {
    this.store = store;
    this.input = document.getElementById('form-message');
    this.dropEl = document.querySelector('[data-id=drop-area]');
    this.fileEl = document.querySelector('.overlapped');
    this.file = null;
    this.toggleBorder = this.toggleBorder.bind(this)

    this.dropEl.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.dropEl.addEventListener('dragenter', this.toggleBorder);
    this.dropEl.addEventListener('dragleave', this.toggleBorder);

    this.dropEl.addEventListener('drop', (evt) => {
      evt.preventDefault();
      this.file = evt.dataTransfer.files[0];
      this.toggleBorder();
      console.log(this.file);
    });

    this.fileEl.addEventListener('change', (evt) => {
      this.file = Array.from(evt.currentTarget.files)[0];
      console.log(this.file)
    });
  }

  start() {
    this.input.addEventListener('submit', (event) => {
      event.preventDefault();
      const {value} = event.target.message;
      const link = value.match(/(?<![\w\-]="|">)(?<![\w\-=\#])(https?:\/\/[\w\-\.!~?&=+\*'(),\/\#\:]+)((?!\<\/\w\>))*?/);
      const result = {type: 'text', data: value, id: uuidv4()};
      addMessage(result, this.store);

      if (link) {
        addLink({
          type: 'link', data: link[0], idMessage: result.id, id: uuidv4(),
        }, this.store);
      }
      event.target.message.value = '';
    });
  }

  toggleBorder(evn) {
    this.dropEl.classList.toggle('drop-border');
  }
}
