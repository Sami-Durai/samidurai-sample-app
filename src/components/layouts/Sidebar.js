import React from "react";

import { Link } from "react-router-dom";

// components
// shared components
import HFNSidebarMenu from "shared-components/sidebarMenu";

// utils
import { getLoginRole } from "utils/login";

// routes
import sideBarRoutes from "routes/sidebar";

class SideBar extends React.PureComponent {
  constructor(props) {
    super(props);

    // variable init start
    const role = getLoginRole();
    const sideBarMenu = sideBarRoutes.find(menu => menu.role === role);
    this.sideBarMenu = (sideBarMenu && Array.isArray(sideBarMenu.routes)) ? sideBarMenu.routes : [] ;
    // variable init end
  }

  render() {
    return (
      <div className="sidebar">
        <div className="header-section">
          <Link to="/">
            <img src="/assets//logo.png" alt="heartfulness" />
          </Link>
        </div>
        <div className="panel-menu">
          <HFNSidebarMenu sidebarMenuList={this.sideBarMenu} />
        </div>
      </div>
    )
  }
}

export default SideBar;
