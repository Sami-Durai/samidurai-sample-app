import React, { useMemo } from "react";

import { Link } from "react-router-dom";

// components
// shared components
import HFNSidebarMenu from "sharedComponents/sidebarMenu";

// utils
import { getLoginRole } from "utils/login";

// routes
import sideBarRoutes from "routes/sidebar.json";

const SideBar = () => {
  const sideBarMenu = useMemo(() => {
    const roleInfo = getLoginRole();
    const sideBarMenu = sideBarRoutes.find(menu => menu.role === roleInfo.role);
    return (sideBarMenu && Array.isArray(sideBarMenu.routes)) ? sideBarMenu.routes : [];
  }, []);

  return (
    <div className="sidebar">
      <div className="header-section">
        <Link to="/">
          <img src="/assets/logo.png" alt="heartfulness" />
        </Link>
      </div>
      <div className="panel-menu">
        <HFNSidebarMenu sidebarMenuList={sideBarMenu} />
      </div>
    </div>
  );
};

export default SideBar;
