import { SUCCESS, INFO, WARN, ERROR, CUSTOM, REQUESTERROR, SETREF } from "store/actionTypes/toaster";

// constants
const initialState = {
  toasterRef: null
};

// reducer
const toasterDetails = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
    case INFO:
    case WARN:
    case ERROR:
    case CUSTOM:
    case REQUESTERROR:
      if (state.toasterRef && state.toasterRef.current) {
        state.toasterRef.current.show(action.payload.toastMessage)
      }
      return {
        ...state,
      };
    case SETREF:
      return {
        ...state,
        toasterRef: action.payload
      };
    default:
      return { ...state, };
  }
};

export default toasterDetails;
