import { disconectUser } from '../reducers/reduce-registr';

export default class User {
  constructor(container, store) {
    this.container = container;
    this.store = store;
    this.start = this.start.bind(this);
    window.addEventListener('beforeunload', () => {
      // eslint-disable-next-line
      disconectUser(this.store.getState().users.curentUser._id);
    });
  }

  start() {
    while (this.container.lastChild) {
      this.container.removeChild(this.container.lastChild);
    }
    this.store.getState().users.users.forEach((elem) => this.addUser(elem));
  }

  addUser(user) {
    const userElem = document.createElement('div');
    const avatar = document.createElement('div');
    const name = document.createElement('div');

    userElem.classList.add('user');
    avatar.classList.add('avatar');
    name.classList.add('name');
    if (user.avatar) {
      avatar.innerHTML = `
      <img src="${user.avatar}" alt="avatar"/>
      <div class="online-${user.online}"></div>
      `;
    } else {
      avatar.innerHTML = `
      ${user.name.slice(0, 1).toUpperCase()}
      <div class="online-${user.online}"></div>
      `;
    }
    name.textContent = user.name;
    userElem.append(avatar, name);
    this.container.appendChild(userElem);
  }
}
