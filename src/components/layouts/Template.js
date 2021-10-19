import React, { Component } from "react";

// react router
import { Route, Switch, Redirect } from "react-router-dom";

// state 
import { connect } from "react-redux";

// components
import AuthGuard from "auth-guard/index";

import Header from "components/layouts/Header";

import Sidebar from "components/layouts/Sidebar";

import Footer from "components/layouts/Footer";

// shared components 
import HFNLoader from "shared-components/lazyLoading";

import HFNBreadCrumb from "shared-components/breadcrumb";

// utils 
import lazy from "utils/lazy";

// constants
const lazyDelay = 500;

// lazy components 
const Dashboard              = lazy("dashboard"         , lazyDelay);
const DonationCollector      = lazy("donationCollector" , lazyDelay);

class DashboardContainer extends Component {
  render() {
    return (
      <div className={`app-wrapper ${this.props.ad.isSidebarOpen ? "open" : ""}`}>

        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="layout">

          <div className="header">
            <Header />
          </div>

          <div className="main-wrapper">

            <div className="main-container">

              <div className="breadcrums-section">
                <HFNBreadCrumb />
              </div>

              <HFNLoader>
                <Switch>
                  <AuthGuard path="/dashboard"                  component={Dashboard             } />
                  <AuthGuard path="/donation-collectors"        component={DonationCollector     } />
                  <Route exact path="/" />
                  <Route>
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </HFNLoader>

            </div>

            <div className="footer-section">
              <Footer />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ad: state.appDetails
});

export default connect(mapStateToProps)(DashboardContainer);
