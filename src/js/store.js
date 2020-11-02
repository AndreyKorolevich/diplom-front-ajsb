import reduceMessage from './reducers/reduce-message';
import reduceMedia from './reducers/reduce-media';

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
    Store.callSubscriber();
  }
}
