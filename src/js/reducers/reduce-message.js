import Actions from '../actions';
import api from '../api/api';

const reduceMessage = (state, action) => {
  console.log(action);
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

export const addMessage = (message) => {
  api.ws.send(JSON.stringify(message));
};

export default reduceMessage;
