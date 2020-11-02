class Api {
  constructor() {
    this.url = 'ws://localhost:7000/ws';
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

    this.ws.addEventListener('message', (evt) => {
      const response = JSON.parse(evt.data);
      if (response.type === 'error') {
      }
    });
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
  }
}

const api = new Api();
export default api;