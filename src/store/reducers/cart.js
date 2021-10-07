import { CARTITEM, UPDATECARTDETAILS, CARTPAGEVISIBILITY } from "../actions/type/cart";

let cartState = {
  cartPageVisibility: false,
  cartDetails: {
    cart_id: "",
    cart_name: "",
    college_id: ""
  },
  cart: {
    modules: [],
    units: [],
    isSavedCart: false
  }
};

export const cartDetails = (state = cartState, action) => {

  switch (action.type) {

    case CARTPAGEVISIBILITY:
      return {
        ...state,
        cartPageVisibility: action.payload
      };

    case UPDATECARTDETAILS:
      return {
        ...state,
        cartDetails: {
          ...action.payload
        }
      };

    case CARTITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          ...action.payload
        }
      };

    default:
      return state;
  }
};