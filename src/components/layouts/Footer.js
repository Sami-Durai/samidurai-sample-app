import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <h4> Copyright © ${new Date().getFullYear()}. Heartfulness. All Rights Reserved </h4>
      </div>
    )
  }
}

export default Footer;
