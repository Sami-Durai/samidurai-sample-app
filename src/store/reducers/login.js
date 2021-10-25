import { LOGIN, LOGOUT, SHOWLOGIN } from "store/actionTypes/login";

// storage
import { lStorage } from "utils/storage";

// constants
const loginState = {
  login: (lStorage.get("authInfo")) ? lStorage.get("authInfo") : {
    id: null,
    name: null,
    email: null,
    role: {},
    avatar: null,
    token: null
  },
  expired: false
};

// reducer
const loginDetails = (state = loginState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        expired: true
      }
    case SHOWLOGIN:
      return {
        ...state,
        login: {
          id: null,
          name: null,
          email: null,
          role: {},
          avatar: null,
          token: null
        },
        expired: false
      }
    default:
      return state;
  }
};

export default loginDetails;
