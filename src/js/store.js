import reduceMessage from './reducers/reduce-message';
import reduceMedia from './reducers/reduce-media';
import reduceRegistr from './reducers/reduce-registr';

export default class Store {
  constructor() {
    this.state = {
      messages: [],
      media: {
        videos: [],
        files: [],
        audios: [],
        links: [],
        voices: [],
      },
      users: {
        isLoader: false,
        isShowRegistr: true,
        errorRegistr: false,
        users: [],
      },
    };
  }

  getState() {
    return this.state;
  }

  static subscribe(observer) {
    Store.callSubscriber = observer;
  }

  static callSubscriber() {
    console.log('hello');
  }

  dispatch(action) {
    this.state.messages = reduceMessage(this.state.messages, action);
    this.state.media = reduceMedia(this.state.media, action);
    this.state.users = reduceRegistr(this.state.users, action);
    Store.callSubscriber();
  }
}
