// state
import appStore from "../store/index";

import { APP_UPDATEBREADCRUMB } from "../store/actions/type/app";

const buildBreadcrumb = breadcrumbs => {
  appStore.dispatch({ type: APP_UPDATEBREADCRUMB, payload: breadcrumbs });
};

export default buildBreadcrumb;
