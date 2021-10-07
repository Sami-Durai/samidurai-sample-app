// utils
import { getLoginRole } from "./login";

// access
import { userPageAccess } from "../routes/pageAccess";

export const hasRouteAccess = routeURL => {
  let url, roleRoutes;
  const role = getLoginRole();

  if (typeof routeURL === "string" && routeURL !== "/")
    url = routeURL.replace(/^\/|\/$/g, "");
  else
    url = routeURL;

  roleRoutes = userPageAccess.find(item => item.role === role);

  return (roleRoutes ? roleRoutes.route.includes(url) : false);
}
