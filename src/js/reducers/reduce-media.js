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
    case Actions.addVideo:
      return {
        ...state,
        videos: [
          ...state.videos,
          action.payload,
        ],
      };
    case Actions.addFile:
      return {
        ...state,
        files: [
          ...state.files,
          action.payload,
        ],
      };
    case Actions.addAudio:
      return {
        ...state,
        audios: [
          ...state.audios,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export const addVideo = (link, store) => {
  store.dispatch({type: Actions.addVideo, payload: link});
};

export const addFile = (link, store) => {
  store.dispatch({type: Actions.addFile, payload: link});
};

export const addAudio = (link, store) => {
  store.dispatch({type: Actions.addAudio, payload: link});
};

export const addLink = (link, store) => {
  store.dispatch({type: Actions.addLink, payload: link});
};

export const addVoice = (link, store) => {
  store.dispatch({type: Actions.addVoice, payload: link});
};

export default reduceMedia;
