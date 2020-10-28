import reduceMessage from './reducers/reduce-message';
import reduceMedia from './reducers/reduce-media';

export default class Store {
  constructor() {
    this.callSubscriber = this.callSubscriber.bind(this);
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

  subscribe(observer) {
    this.callSubscriber = observer;
  }

  callSubscriber() {
    console.log('hello');
  }

  dispatch(action) {
    this.state.messages = reduceMessage(this.state.messages, action);
    this.state.media = reduceMedia(this.state.media, action);
    this.callSubscriber();
  }
}
