import { TOGGLE, ONHIDE, ONSHOW, CUSTOM } from "store/actionTypes/modalPopup";

// constants
const initialState = {
  header: "ModalPopup",
  visible: false,
  className: "sdm-popup",
  blockScroll: true,
  onHide: () => { }
};

// reducer
const modalPopupDetails = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        visible: action.payload,
        footer: null
      };
    case ONSHOW:
      return {
        ...state, onShow: () => { action.payload() }
      };
    case ONHIDE:
      return {
        ...state, onHide: () => { action.payload() }
      };
    case CUSTOM:
      return {
        ...state, ...action.payload
      };
    default:
      return { ...state };
  }
};

export default modalPopupDetails;
