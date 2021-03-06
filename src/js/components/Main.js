import Input from './Input';
import Message from './Message';
import Media from './Media';
import Login from './Login';
import User from './User';
import Scrol from './Scrol';
import { sendUser } from '../reducers/reduce-registr';

export default class Main {
  constructor(store) {
    this.store = store;
    this.containerMessages = document.querySelector('.article');
    this.containerUsers = document.querySelector('.left-aside');
    this.message = new Message(this.containerMessages, this.store);
    this.input = new Input(store);
    this.media = new Media(store);
    this.login = new Login(store);
    this.user = new User(this.containerUsers, store);
    this.scrol = new Scrol(this.containerMessages, store);

    this.start = this.start.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  start() {
    this.input.start();
    this.media.start();
    this.user.start();
    this.scrol.start();
    if (sessionStorage.getItem('currentUser')) {
      this.login.hideForm();
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      setTimeout(() => {
        sendUser({
          type: 'checkUser',
          password: '12345678',
          name: currentUser.name,
        }, this.store);
      }, 1000);
    }
  }

  rerender() {
    this.message.start();
    this.login.showLoader();
    const { errorCheck, errorRegistr } = this.store.getState().users;
    if (errorRegistr) {
      Login.showError(document.querySelector('#signin [name="name"]'), errorRegistr);
    } else if (errorCheck) {
      Login.showError(document.querySelector('#login [name="name"]'), errorCheck);
    }
    if (!this.store.getState().users.isShowRegistr) {
      this.login.hideForm();
    }
    this.media.start();
    this.user.start();
  }
}
