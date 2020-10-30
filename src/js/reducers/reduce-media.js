import Actions from '../actions';

const reduceMedia = (state, action) => {
  switch (action.type) {
    case Actions.addLink:
      return {
        ...state,
        links: [
          ...state.links,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export const addVideo = (link, store) => {
  store.dispatch({ type: Actions.addLinks, payload: link });
};

export const addFile = (link, store) => {
  store.dispatch({ type: Actions.addLinks, payload: link });
};

export const addAudio = (link, store) => {
  store.dispatch({ type: Actions.addLinks, payload: link });
};

export const addLink = (link, store) => {
  store.dispatch({ type: Actions.addLink, payload: link });
};

export const addVoice = (link, store) => {
  store.dispatch({ type: Actions.addLinks, payload: link });
};

export default reduceMedia;
