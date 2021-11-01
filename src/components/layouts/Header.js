import React, { useRef, useMemo, useCallback } from "react";

// react router
import { useHistory } from "react-router";

import { signOut } from "@heartfulnessinstitute/react-hfn-profile";

// components
// prime components
import { Menu } from "primereact/menu";

// utils 
import { lStorage } from "utils/storage";

import { toggleSideBar } from "utils/common";

import response from "utils/response";

// services
import LoginService from "services/login";

import credentials from "assets/data/credentials.json";

const Header = () => {
  const menuRef = useRef(null);

  const loginService = useRef(new LoginService());

  const history = useHistory();

  const user = useMemo(() => lStorage.get("authInfo"), []);

  const changeRole = useCallback(async roleInfo => {
    let apiResponse = await response.add({
      service: loginService.current,
      method: "changeUserRole",
      data: { item: { role: roleInfo } },
      toasterMessage: {
        success: `Changed role to "${roleInfo.name}`,
        error: `Unable to change role to ${roleInfo.name}`
      }
    });

    const userInfo = credentials.find(({ email_address }) => email_address === user.email);

    if (userInfo) {
      lStorage.set("authInfo", { ...user, role: roleInfo, roles: userInfo.roles });
      window.location.reload();
    }

    if (apiResponse && apiResponse.data && !apiResponse.data.isError && apiResponse.data.data) {
      const roleData = apiResponse.data.data;
      lStorage.set("authInfo", { ...user, role: roleData.role, roles: roleData.roles });
      window.location.reload();
    }
  }, []);

  const menu = useMemo(() => {
    let menuItems = [
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
    ];

    if (user && Array.isArray(user.roles) && user.roles.length > 1) {
      const roleMenu = {
        label: "Roles",
        items: user.roles.filter(roleInfo => user.role.role !== roleInfo.role).map(roleInfo => ({
          label: roleInfo.name,
          icon: "pi pi-user-edit",
         command: () => changeRole(roleInfo)
        }))
      };
      menuItems.unshift(roleMenu);
    }
    
    return menuItems;
  }, []);

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
