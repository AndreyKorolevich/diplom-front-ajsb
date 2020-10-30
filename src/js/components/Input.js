import {v4 as uuidv4} from 'uuid';
import {addMessage} from '../reducers/reduce-message';
import {addLink} from '../reducers/reduce-media';
import Worker from '../webworker/web.worker';
import Modal from "./Modal";

export default class Input {
  constructor(store) {
    this.store = store;
    this.messageForm = document.getElementById('message-form');
    this.cardForm = document.getElementById('card-form');
    this.dropEl = document.querySelector('[data-id=drop-area]');
    this.fileEl = document.querySelector('.overlapped');
    this.file = null;
    this.toggleBorder = this.toggleBorder.bind(this);
    this.processingFile = this.processingFile.bind(this);

    this.dropEl.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.dropEl.addEventListener('dragenter', this.toggleBorder);
    this.dropEl.addEventListener('dragleave', this.toggleBorder);

    this.dropEl.addEventListener('drop', (evt) => {
      evt.preventDefault();
      this.file = evt.dataTransfer.files[0];
      this.toggleBorder();
      this.processingFile(this.file);
    });

    this.fileEl.addEventListener('change', (evt) => {
      this.file = evt.target.files[0];
      this.processingFile(this.file);
    });
  }

  start() {
    this.messageForm.addEventListener('submit', (event) => {
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

    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    this.cardForm.addEventListener('cancel', (event) => {
      event.preventDefault();
    })
  }

  toggleBorder(evn) {
    this.dropEl.classList.toggle('drop-border');
  }

  async processingFile(file) {
    const worker = new Worker();
    worker.addEventListener('message', ({data: result}) => {
      worker.terminate();
      Modal.showModal(result);
    });
    worker.postMessage({file});
  }
}
