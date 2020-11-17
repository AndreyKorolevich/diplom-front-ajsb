class Api {
  constructor() {
    this.url = 'wss://ajsb-diplom.herokuapp.com/ws';
    //this.url = 'ws://localhost:7010/ws';
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', () => {
      console.log('connected');
    });

    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });

    // window.addEventListener('beforeunload', () => {
    //   this.ws.send(JSON.stringify({type: 'deleteUser', user: this.curentUser}));
    // });
    //
  }
}

const api = new Api();
export default api;
