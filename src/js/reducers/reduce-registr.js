import Actions from '../actions';
import api from '../api/api';

const reduceRegistr = (state, action) => {
  switch (action.type) {
    case Actions.sendUser:
      return {
        ...state,
        isLoader: true,
      };
    case Actions.addUser:
      return {
        ...state,
        curentUser: action.payload,
        isLoader: false,
        isShowRegistr: false,
        errorRegistr: false,
        errorCheck: false,
      };
    case Actions.allUsers:
      return {
        ...state,
        users: [
          ...action.payload,
        ],
      };
    case Actions.errorRegistr:
      return {
        ...state,
        errorRegistr: action.payload,
        isLoader: false,
      };
    case Actions.errorCheck:
      return {
        ...state,
        errorCheck: action.payload,
        isLoader: false,
      };
    default:
      return state;
  }
};

export const addUser = (data, store) => {
  store.dispatch({ type: Actions.addUser, payload: data });
};

export const allUsers = (data, store) => {
  store.dispatch({ type: Actions.allUsers, payload: data });
};

export const errorRegistr = (data, store) => {
  store.dispatch({ type: Actions.errorRegistr, payload: data });
};

export const errorCheck = (data, store) => {
  store.dispatch({ type: Actions.errorCheck, payload: data });
};

export const disconectUser = (id) => {
  api.ws.send(JSON.stringify({
    type: 'disconectUser',
    userId: id,
  }));
};


export const sendUser = (user, store) => {
  store.dispatch({ type: Actions.sendUser });
  api.ws.send(JSON.stringify(user));
  api.ws.addEventListener('message', function handler(evt) {
    const response = JSON.parse(evt.data);
    switch (response.type) {
      case 'newUser':
        addUser(response.data, store);
        break;
      case 'allUsers':
        allUsers(response.data, store);
        break;
      case 'checkUser':
        addUser(response.data, store);
        break;
      case 'addMessage':
        store.dispatch({ type: Actions.addMessage, payload: response.data });
        break;
      case 'error':
        errorRegistr(response.text, store);
        api.ws.removeEventListener('message', handler);
        break;
      case 'errorCheck':
        errorCheck(response.text, store);
        api.ws.removeEventListener('message', handler);
        break;
      case 'disconectUser':
        allUsers(response.data, store);
        break;
      default:
        break;
    }
  });
};

export default reduceRegistr;
