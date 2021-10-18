import { SUCCESS, INFO, WARN, ERROR, CUSTOM , REQUESTERROR , SETREF} from '../actions/type/toaster';

const initialState = {
  toasterRef : null,
};

const toasterDetails = (state = initialState, action) => {

  switch (action.type) {
    case SUCCESS:
    case INFO:
    case WARN:
    case ERROR:
    case CUSTOM:
    case REQUESTERROR:
      if(state.toasterRef && state.toasterRef.current) {
        state.toasterRef.current.show(action.payload.toastMessage)
      }
      return {
        ...state,
      };
    case SETREF:
    return {
      ...state,
      toasterRef : action.payload
    };
    default:
      return { ...state, };
  }
};

export {
  toasterDetails
}