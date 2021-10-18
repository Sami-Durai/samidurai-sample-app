import React from "react";

import { withRouter } from "react-router";

// prime components
import { Button } from "primereact/button";

// utils
import moment from "moment";

// config
import config from "assets/config";

class HFNErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // variable init start
    const date = moment().format("%20-%20MMM%20DD%20YYYY");
    const basicMailURL = "mailto:samidurai.t@volunteer.heartfulness.org?subject=Heartful%20Campus%20eportal%20-%20Bug%20Identified";
    // variable init end

    // state management start
    this.state = { 

      error: null, 

      errorInfo: null,

      mailURL: date ? (basicMailURL + date) : basicMailURL

     };
     // state management end
  }

  goToDashboard = () => {
    this.setState({
      error: null,
      errorInfo: null
    }, () => { this.props.history.push("") });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundary-section p-mt-4">
          <div className="p-p-4 p-p-4">
            <div className="p-mb-4 p-text-center">
              <img src="/assets//logo.png" alt="heartfulness" />
            </div>
            <div className="p-text-center p-text-normal"> Oops! Something went wrong </div>
            <div className="p-field p-text-center p-mx-6 p-mb-6 p-mt-5">
              <Button label="Go To Home" className="goto-home-button p-mt-2 p-mr-3" onClick={this.goToDashboard} />
              <a className="p-button p-component report-issue-button p-mt-2 p-mr-3" href={this.state.mailURL}> Report  Issue </a>
            </div>
            {
              (!config.NODE_ENV || config.NODE_ENV === "development") ? <details style={{ whiteSpace: "pre-wrap" }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details> : ""
            }
          </div>

        </div>
      );
    }
    return this.props.children;
  }
}

export default withRouter(HFNErrorBoundary);
