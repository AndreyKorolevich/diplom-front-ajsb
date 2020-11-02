import './utils/utils';
import './api/api'
import Store from './store';
import Main from './components/Main';

const store = new Store();
const main = new Main(store);

main.start();
Store.subscribe(main.rerender);

window.store = store;
