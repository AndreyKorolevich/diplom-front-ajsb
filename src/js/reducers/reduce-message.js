import Actions from '../actions';
import api from '../api/api';

const reduceMessage = (state, action) => {
  switch (action.type) {
    case Actions.addMessage:
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
};

export const addMessage = (message, store) => {
  store.dispatch({ type: Actions.addMessage, payload: message });
  api.sendMessage(message);
};

export default reduceMessage;
