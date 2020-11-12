import Actions from '../actions';
import api from '../api/api';

const reduceMessage = (state, action) => {
  switch (action.type) {
    case Actions.addMessage:
      return [
        ...state,
        action.payload,
      ];
    case Actions.lastMessages:
      return [
        ...state,
        ...action.payload.reverse(),
      ];
    default:
      return state;
  }
};

export const addMessage = (message) => {
  api.ws.send(JSON.stringify(message));
};

export default reduceMessage;
