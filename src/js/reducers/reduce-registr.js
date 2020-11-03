import Actions from '../actions';
import api from '../api/api';

const reduceRegistr = (state, action) => {
  console.log(action)
  switch (action.type) {
    case Actions.sendUser:
      return {
        ...state,
        isLoader: true,
      };
    case Actions.addUser:
      return {
        users: [
          ...state.users,
          action.payload,
        ],
        isLoader: false,
        isShowRegistr: false,
        errorRegistr: false
      };
    case Actions.errorRegistr:
      return {
        ...state,
        errorRegistr: action.payload,
        isLoader: false,
      };
    default:
      return state;
  }
};

export const addUser = (data, store) => {
  store.dispatch({type: Actions.addUser, payload: data});
};

export const errorRegistr = (data, store) => {
  store.dispatch({type: Actions.errorRegistr, payload: data});
};

export const sendUser = (user, store) => {
  store.dispatch({type: Actions.sendUser});
  api.ws.send(JSON.stringify(user));
  api.ws.addEventListener('message', function handler(evt) {
    console.log('done')
    const response = JSON.parse(evt.data);
    if (response.type === 'newUser') addUser(response.data, store);
    else if (response.type === 'error') errorRegistr(response.text, store);
    api.ws.removeEventListener('message', handler);
  });
};

export default reduceRegistr;
