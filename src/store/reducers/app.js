import { APP_OPENSIDEBAR, APP_UPDATEBREADCRUMB } from "../actions/type/app";

const appState = {
  isSidebarOpen: (window.screen.width > 767) ? false : true,
  breadcrumb: []
};

const appDetails = (state = appState, action) => {
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
