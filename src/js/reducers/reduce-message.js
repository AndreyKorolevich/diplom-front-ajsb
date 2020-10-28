import Actions from '../actions';

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
};

export default reduceMessage;
