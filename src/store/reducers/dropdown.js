import {
  CLEAR,
  GENERALSTATUS,
  FC
} from "store/actionTypes/dropdown";

// constants
const initialState = {
  generalStatus: [],
  fc: []
};

// reducer
const dropdownDetails = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR:
      return {
        ...state, ...initialState
      };
    case GENERALSTATUS:
      return {
        ...state, generalStatus: action.payload
      };
    case FC:
      return {
        ...state, fc: action.payload
      };
    default:
      return { ...state };
  }
};

export default dropdownDetails;
