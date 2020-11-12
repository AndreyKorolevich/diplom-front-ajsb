import { changeProgress } from '../reducers/reduce-scroll';

export default class Scrol {
  constructor(container, store) {
    this.container = container;
    this.store = store;
    this.checkScrol = this.checkScrol.bind(this);
  }

  start() {
    this.container.addEventListener('scroll', this.checkScrol);
  }

  checkScrol() {
    if (this.container.scrollTop <= 50 && !this.store.getState().isProgress) {
      const lastMessage = this.store.getState().messages[0].date;
      changeProgress({ lastMessage }, this.store);
    }
  }
}
