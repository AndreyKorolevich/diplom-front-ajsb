import reduceMessage from './reducers/reduce-message';

export default class Store {
  constructor() {
    this.callSubscriber = this.callSubscriber.bind(this)
    this.state = {
      messages: [],
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
    this.callSubscriber();
  }
}

