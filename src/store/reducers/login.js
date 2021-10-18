
import { LOGIN, SIGNUP, LOGOUT, SHOWLOGIN } from "store/actions/type/login";

// storage
import { lStorage } from "utils/storage";

// constants
const loginState = {
  login: (lStorage.get("dmsAuthInfo")) ? lStorage.get("dmsAuthInfo") : {
    id: null,
    isUser: false,
    userRole: null,
    name: null,
    email: null,
    avatar: null
  },
  signup: {
    signupMessage: "React Signup"
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
    case SIGNUP:
      return { ...state, signup: action.payload }
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
          isUser: false,
          userRole: null,
          name: null,
          email: null,
          avatar: null
        },
        expired: false
      }
    default:
      return state;
  }
};

export default loginDetails;
