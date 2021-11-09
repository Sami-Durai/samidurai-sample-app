import React from "react";

// router
import { Route, Switch, Redirect } from "react-router-dom";

// state 
import { useSelector } from "react-redux";

// components
import AuthGuard from "auth-guard/index";

import Header from "components/layouts/Header";

import Sidebar from "components/layouts/Sidebar";

import Footer from "components/layouts/Footer";

// shared components 
import HFNLoader from "sharedComponents/lazyLoading";

import HFNBreadCrumb from "sharedComponents/breadcrumb";

// utils 
import lazy from "utils/lazy";

// constants
const lazyDelay = 500;

// lazy components 
const Dashboard            = lazy(  "dashboard"           , lazyDelay);
const FinanceController    = lazy(  "financeController"   , lazyDelay);
const AshramManager        = lazy(  "ashramManager"       , lazyDelay);
const DonationCollector    = lazy(  "donationCollector"   , lazyDelay);
const DonationTransaction  = lazy(  "donationTransaction" , lazyDelay);
const PaymentTransaction   = lazy(  "paymentTransaction"  , lazyDelay);
const Donation             = lazy(  "donation"            , lazyDelay);
const DonationCollection   = lazy(  "donationCollection"  , lazyDelay);
const Reports              = lazy(  "reports"             , lazyDelay);
const StandardData         = lazy(  "standardData"        , lazyDelay);

const DashboardContainer = () => {
  const isSidebarOpen = useSelector(state => state.appDetails.isSidebarOpen);

  return (
    <div className={`app-wrapper ${isSidebarOpen ? "open" : ""}`}>

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
                <AuthGuard path="/dashboard"                component={  Dashboard              } />
                <AuthGuard path="/finance-controllers"      component={  FinanceController      } />
                <AuthGuard path="/ashram-managers"          component={  AshramManager          } />
                <AuthGuard path="/donation-collectors"      component={  DonationCollector      } />
                <AuthGuard path="/donation-transactions"    component={  DonationTransaction    } />
                <AuthGuard path="/payment-transactions"     component={  PaymentTransaction     } />
                <AuthGuard path="/donations"                component={  Donation               } />
                <AuthGuard path="/donation-collections"     component={  DonationCollection     } />
                <AuthGuard path="/reports"                  component={  Reports                } />
                <AuthGuard path="/standard-data"            component={  StandardData           } />
                <Route exact path="/">
                  <Redirect to="/dashboard" />
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
};

export default DashboardContainer;
