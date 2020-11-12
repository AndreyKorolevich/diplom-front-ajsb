export default class Message {
  constructor(container, store) {
    this.container = container;
    this.store = store;
    this.start = this.start.bind(this);
    this.lengthMessage = 0;
    this.lastMessage = null;
  }

  start() {
    const { messages } = this.store.getState();
    if (messages.length - this.lengthMessage === 15) {
      for (let i = 0; i < 15; i += 1) {
        this.addAllMessages(messages[i]);
      }
      this.lengthMessage = messages.length;
      // eslint-disable-next-line
      this.lastMessage = messages[0];
    } else if (messages.length - this.lengthMessage === 1) {
      this.addOneMessage(messages[messages.length - 1]);
      this.lengthMessage = messages.length;
      // eslint-disable-next-line
      this.lastMessage = messages[0];
    } else if (messages.length - this.lengthMessage <= 10) {
      for (let i = messages.length - this.lengthMessage - 1; i >= 0; i -= 1) {
        this.addDopMessages(messages[i]);
      }
      this.lengthMessage = messages.length;
      // eslint-disable-next-line
      this.lastMessage = messages[0];
    }
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

  addOneMessage(message) {
    this.container.insertAdjacentElement('beforeend', this.addMessage(message));
    this.container.scrollTop = 9999;
  }

  addAllMessages(message) {
    this.container.appendChild(this.addMessage(message));
    this.container.scrollTop = 9999;
  }

  addDopMessages(message) {
    this.container.insertAdjacentElement('afterbegin', this.addMessage(message));
  }

  addMessage(message) {
    const mesElem = document.createElement('div');
    if (message) {
      const mesText = document.createElement('div');
      const avatar = document.createElement('div');
      const time = document.createElement('div');
      time.classList.add('time');
      avatar.classList.add('message-avatar');
      const date = new Date(message.date);

      time.textContent = `${date.getHours()}:${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
      if (message.userId.avatar) {
        avatar.innerHTML = `
      <img src="${message.userId.avatar}"/>
      `;
      } else {
        avatar.textContent = `${message.userId.name.slice(0, 1)}`.toUpperCase();
      }

      // eslint-disable-next-line
      mesText.dataset._id = message._id;
      mesText.classList.add('message');
      // eslint-disable-next-line
      if (message.userId._id === this.store.getState().users.curentUser._id) {
        mesText.classList.add('yours-text');
        mesElem.classList.add('yours-message');
      } else {
        mesText.classList.add('other-text');
        mesElem.classList.add('other-message');
      }
      switch (message.type) {
        case 'text':
          mesText.innerHTML = Message.cheackForLink(message.text);
          break;
        case 'video':
          mesText.innerHTML = `
        <video class="message__video" controls src="${message.file}"></video>
        <p class="message__text">${Message.cheackForLink(message.text)}</p>
        `;
          break;
        case 'audio':
          mesText.innerHTML = `
        <audio controls src="${message.data.file}"></audio>
        <p class="message__text">${Message.cheackForLink(message.text)}</p>
        `;
          mesText.classList.add('message__audio');
          break;
        case 'image':
          mesText.innerHTML = `
        <img class="message__img" src="${message.data.file}">
        <p class="message__text">${Message.cheackForLink(message.text)}</p>
        `;
          break;
        default:
          mesText.innerHTML = `
        <a class="message__file" download = "" href="${message.file}">
        <div class="card-file__icon">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-file-earmark-font" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
            <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3zm1.443 3H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
            </svg>
        </div>
        <div class="card-file__name">Text files</div>
        </a>
        <p class="message__text">${Message.cheackForLink(message.text)}</p>
        `;
          break;
      }

      mesText.appendChild(time);
      // eslint-disable-next-line
      if (message.userId._id === this.store.getState().users.curentUser._id) {
        mesElem.append(mesText, avatar);
      } else {
        mesElem.append(avatar, mesText);
      }
    }
    return mesElem;
  }
}
