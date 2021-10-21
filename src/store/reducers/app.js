import { APP_OPENSIDEBAR, APP_UPDATEBREADCRUMB } from "store/actionTypes/app";

// constants
const initialState = {
  isSidebarOpen: (window.screen.width > 767) ? false : true,
  breadcrumb: []
};

// reducer
const appDetails = (state = initialState, action) => {
  switch (action.type) {
    case APP_OPENSIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.payload
      };
    case APP_UPDATEBREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload
      };
    default:
      return state;
  }
};

export default appDetails;
