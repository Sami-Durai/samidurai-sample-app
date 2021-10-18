import React, { Component } from "react";

// react router
import { withRouter } from "react-router";

// react redux 
import { connect } from "react-redux";

// import { signOut } from "@heartfulnessinstitute/react-hfn-profile";

import { APP_OPENSIDEBAR } from "../../store/actions/type/app";

// components
// prime components
import { Menu } from "primereact/menu";

// utils 
import { lStorage } from "../../utils/storage";

class Header extends Component {
  constructor(props) {
    super(props);

    // state management start
    this.state = {
      userMenuItems: [
        {
          items: [
            {
              label: "My Account", icon: "uil uil-user", command: () => {
                this.openAccount()
              }
            },
            {
              label: "Logout", icon: "uil uil-sign-out-alt", command: () => {
                this.logout()
              }
            },
          ]
        }
      ],

      userDetails: null
    };
    // state management end
  }

  // logout section start
  logout = () => {
    lStorage.clear();
    this.props.history.push("/login");
    //signOut();
  }
  // logout section end

  // user edit section start
  openAccount = () => {
    this.props.history.push("/account");
  };
  // user edit section end

  openSidebar = () => {
    if (this.props.ad.isSidebarOpen)
      this.props.dispatch({ type: APP_OPENSIDEBAR, payload: false });
    else
      this.props.dispatch({ type: APP_OPENSIDEBAR, payload: true });
  }

  componentDidMount() {
    const userDetails = lStorage.get("dmsAuthInfo");
    this.setState({ userDetails: userDetails });
  }

  render() {
    const { userDetails } = this.state;

    return (
      <nav className="header-nav">

        <div className="menu-toggler" onClick={this.openSidebar}>
          <i className="uil uil-bars"></i>
        </div>

        {userDetails && <div className="left-menu">

          <div className="helper-links">
          </div>

          <div className="user-info" onClick={(event) => this.menu.toggle(event)}>
            <span className="avator">
              <img src="/assets/avatar.png" alt="profile" />
            </span>
            <span className="user-name">
              <span className="name"> {userDetails.name || ""} </span>
              <span className="role"> {userDetails.role || ""} </span>
            </span>
          </div>

          <Menu className="user-menu" model={this.state.userMenuItems} popup ref={el => this.menu = el} />

        </div>
        }
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  ad: state.appDetails
});

export default withRouter(connect(mapStateToProps)(Header));
