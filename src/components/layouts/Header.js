import React, { useRef, useMemo } from "react";

// react router
import { useHistory } from "react-router";

import { signOut } from "@heartfulnessinstitute/react-hfn-profile";

// components
// prime components
import { Menu } from "primereact/menu";

// utils 
import { lStorage } from "utils/storage";

import { toggleSideBar } from "utils/common";

const Header = () => {
  const menuRef = useRef(null);

  const history = useHistory();

  const user = useMemo(() => lStorage.get("authInfo"), []);

  const menu = useMemo(() => ([
    {
      items: [
        {
          label: "My Account", icon: "uil uil-user", command: () => {
            history.push("/account");
          }
        },
        {
          label: "Logout", icon: "uil uil-sign-out-alt", command: () => {
            lStorage.clear();
            signOut();
            history.push("/login");
          }
        }
      ]
    }
  ]), []);

  return (
    <nav className="header-nav">

      <div className="menu-toggler" onClick={toggleSideBar}>
        <i className="uil uil-bars"></i>
      </div>

      {user && <div className="left-menu">

        <div className="helper-links">
        </div>

        <div className="user-info" onClick={(event) => menuRef.current && menuRef.current.toggle(event)}>
          <span className="avator">
            <img src="/assets/avatar.png" alt="profile" />
          </span>
          <span className="user-name">
            <span className="name"> {user.name || ""} </span>
            <span className="role"> {(user.role && user.role.name) ? user.role.name : ""} </span>
          </span>
        </div>

        <Menu className="user-menu" model={menu} popup ref={menuRef} />

      </div>
      }
    </nav>
  );
}

export default Header;
