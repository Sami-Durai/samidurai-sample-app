// state
import appStore from "store";

import { APP_UPDATEBREADCRUMB } from "store/actionTypes/app";

const buildBreadcrumb = breadcrumbs => {
  appStore.dispatch({ type: APP_UPDATEBREADCRUMB, payload: breadcrumbs });
};

export default buildBreadcrumb;
