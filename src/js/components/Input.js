import {v4 as uuidv4} from 'uuid';
import {addMessage} from '../reducers/reduce-message';
import {addAudio, addFile, addLink, addVideo} from '../reducers/reduce-media';
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
      const {value} = event.target.message
      const result = {type: 'text', data: value, id: uuidv4()};
      addMessage(result, this.store);

      const link = value.match(/(?<![\w\-]="|">)(?<![\w\-=\#])(https?:\/\/[\w\-\.!~?&=+\*'(),\/\#\:]+)((?!\<\/\w\>))*?/);
      if (link) {
        addLink({
          type: 'link', data: link[0], idMessage: result.id, id: uuidv4(),
        }, this.store);
      }
      event.target.message.value = '';
    });

    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = event.target.message.value;
      const fileData = event.target.previousElementSibling.firstElementChild;
      const result = {type: fileData.dataset.type, data: {file: fileData.src, text}, id: uuidv4()};
      Modal.hideModal();

      addMessage(result, this.store);
      switch (fileData.dataset.type) {
        case 'video':
          addVideo({
            type: 'video', idMessage: result.id, id: uuidv4(),
          }, this.store)
          break;
        case 'audio':
          addAudio({
            type: 'audio', idMessage: result.id, id: uuidv4(),
          }, this.store)
          break;
        default:
          addFile({
            type: 'file', idMessage: result.id, id: uuidv4(),
          }, this.store)
      }
    })

    this.cardForm.addEventListener('reset', (event) => {
      event.preventDefault();
      Modal.hideModal();
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
