import './utils/utils';
import Store from "./store";
import Main from "./components/Main";

const store = new Store();
const main = new Main(store);
main.start();
store.subscribe(main.rerender);

window.store = store;
