import React, { Component } from "react";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // variable init start
    this.breadcrumbs = [
      { label: "Dashboard", url: "dashboard", icon: "pi pi-home" }
    ];
    // variable init end
  }

  componentDidMount() {
    buildBreadcrumb(this.breadcrumbs);
  }

  render() {
    return (
      <>
      Dashboard contents will be displayed here after development.
      </>
    )
  }
}

export default Dashboard;
