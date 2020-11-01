export default class Message {
  constructor(container, store) {
    this.container = container;
    this.store = store;
    this.start = this.start.bind(this);
  }

  start() {
    while (this.container.lastChild && this.container.children.length > 2) {
      this.container.removeChild(this.container.lastChild);
    }
    this.store.getState().messages.forEach((elem) => this.addMessage(elem));
  }



  static cheackForLink(text) {
    // eslint-disable-next-line
    const link = text.match(/(?<![\w\-]="|">)(?<![\w\-=\#])(https?:\/\/[\w\-\.!~?&=+\*'(),\/\#\:]+)((?!\<\/\w\>))*?/);
    if (link) {
      const endPoint = link.index + link[0].length;
      const message = `
        ${text.slice(0, link.index)}
        <a target="_blank" href="${link[0]}">${link[0]}</a>
         ${text.slice(endPoint)}
        `;
      return message;
    }
    return text;
  }

  addMessage(message) {
    const mesElem = document.createElement('div');
    mesElem.dataset.id = message.id;
    mesElem.classList.add('message');
    mesElem.classList.add('yours-message');
    switch (message.type) {
      case 'text':
        mesElem.innerHTML = Message.cheackForLink(message.data);
        break;
      case 'video':
        mesElem.innerHTML = `
        <video class="message__video" controls src="${message.data.file}"></video>
        <p class="message__text">${Message.cheackForLink(message.data.text)}</p>
        `;
        break;
      case 'audio':
        mesElem.innerHTML = `
        <audio controls src="${message.data.file}"></audio>
        <p class="message__text">${Message.cheackForLink(message.data.text)}</p>
        `;
        mesElem.classList.add('message__audio');
        break;
      case 'image':
        mesElem.innerHTML = `
        <img class="message__img" src="${message.data.file}">
        <p class="message__text">${Message.cheackForLink(message.data.text)}</p>
        `;
        break;
      default:
        mesElem.innerHTML = `
        <a class="message__file" download = "" href="${message.data.file}">
        <div class="card-file__icon">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-file-earmark-font" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
            <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3zm1.443 3H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
            </svg>
        </div>
        <div class="card-file__name">Text files</div>
        </a>
        <p class="message__text">${Message.cheackForLink(message.data.text)}</p>
        `;
        break;
    }
    this.container.appendChild(mesElem);
  }
}
