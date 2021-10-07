import React, { Component } from 'react';

class HFNLoading extends Component {
  render() {
    return (
      <>
        <div className="lds-roller-wrapper">
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </>
    );
  }
}

export default HFNLoading;
