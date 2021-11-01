// utils
import { getLoginRole } from "utils/login";

// access
import userPageAccess from "routes/pageAccess.json";

export const hasRouteAccess = routeURL => {
  let url, roleRoutes;
  const roleInfo = getLoginRole();

  if (typeof routeURL === "string" && routeURL !== "/")
    url = routeURL.replace(/^\/|\/$/g, "");
  else
    url = routeURL;

  roleRoutes = userPageAccess.find(item => item.role === roleInfo.role);

  return (roleRoutes ? roleRoutes.route.includes(url) : false);
}
