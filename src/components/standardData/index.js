import React from "react";

// router
import { Switch } from "react-router-dom";

// components
import AuthGuard from "auth-guard";

import Country           from   "components/standardData/country"          ;

import Ashram            from   "components/standardData/ashram"           ;

import Organization      from   "components/standardData/organization"     ;

import DonationAccount   from   "components/standardData/donationAccount"  ;

import PaymentAccount    from   "components/standardData/paymentAccount"   ;

import Role              from   "components/standardData/role"             ;

const StandardData = () => {
  return (
    <Switch>
      <AuthGuard path="/standard-data/countries"          component={Country}           />
      <AuthGuard path="/standard-data/ashrams"            component={Ashram}            />
      <AuthGuard path="/standard-data/organizations"      component={Organization}      />
      <AuthGuard path="/standard-data/donation-accounts"  component={DonationAccount}   />
      <AuthGuard path="/standard-data/payment-accounts"   component={PaymentAccount}    />
      <AuthGuard path="/standard-data/roles"              component={Role}              />
    </Switch>
  );
};

export default StandardData;
