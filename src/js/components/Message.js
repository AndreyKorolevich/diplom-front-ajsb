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
    this.store.getState().messages.forEach((elem) => this.addTMessage(elem));
  }

  cheackForLink(text) {
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

  addTMessage(message) {
    const mesElem = document.createElement('div');
    mesElem.dataset.id = message.id;
    mesElem.classList.add('message');
    mesElem.classList.add('yours-message');
    mesElem.innerHTML = this.cheackForLink(message.data);

    this.container.appendChild(mesElem);
  }
}
