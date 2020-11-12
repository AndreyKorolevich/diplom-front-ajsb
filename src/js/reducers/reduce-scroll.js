import Actions from '../actions';
import api from '../api/api';

const reduceScroll = (state, action) => {
  switch (action.type) {
    case Actions.changeProgress:
      return {
        ...state,
        isProgress: true,
      };
    case Actions.lastTenMessages:
      return {
        ...state,
        isProgress: false,
        messages: [
          ...action.payload.reverse(),
          ...state.messages,
        ],
      };
    default:
      return state;
  }
};

export const addTenMessages = (data, store) => {
  store.dispatch({ type: Actions.lastTenMessages, payload: data });
};

export const changeProgress = (data, store) => {
  api.ws.send(JSON.stringify({ type: 'lastTenMessages', lastMessage: data.lastMessage }));
  store.dispatch({ type: Actions.changeProgress });

  api.ws.addEventListener('message', function handler(evt) {
    const response = JSON.parse(evt.data);
    switch (response.type) {
      case 'lastTenMessages':
        addTenMessages(response.data, store);
        api.ws.removeEventListener('message', handler);
        break;
      default:
        break;
    }
  });
};

export default reduceScroll;
