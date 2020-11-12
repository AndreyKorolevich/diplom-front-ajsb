import reduceMessage from './reducers/reduce-message';
import reduceMedia from './reducers/reduce-media';
import reduceRegistr from './reducers/reduce-registr';
import reduceScroll from './reducers/reduce-scroll';

export default class Store {
  constructor() {
    this.state = {
      isProgress: false,
      messages: [],
      media: {
        videos: [],
        files: [],
        audios: [],
        links: [],
        voices: [],
      },
      users: {
        curentUser: null,
        isLoader: false,
        isShowRegistr: true,
        errorRegistr: false,
        errorCheck: false,
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
    this.state = reduceScroll(this.state, action);
    Store.callSubscriber();
  }
}
