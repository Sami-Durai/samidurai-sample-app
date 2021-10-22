import {
  CLEAR,
  GENERALSTATUS,
  COUNTRY,
  ORGANIZATION,
  FC,
  AM,
  ACCOUNTTYPE
} from "store/actionTypes/dropdown";

// constants
const initialState = {
  generalStatus: [],
  country: [],
  organization: [],
  fc: [],
  am: [],
  accountType: []
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
    case COUNTRY:
      return {
        ...state, country: action.payload
      };
    case ORGANIZATION:
      return {
        ...state, organization: action.payload
      };
    case FC:
      return {
        ...state, fc: action.payload
      };
    case AM:
      return {
        ...state, am: action.payload
      };
    case ACCOUNTTYPE:
      return {
        ...state, accountType: action.payload
      };
    default:
      return { ...state };
  }
};

export default dropdownDetails;
