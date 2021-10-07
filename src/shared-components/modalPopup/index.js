import React, { Component } from 'react';

// store 
import { connect } from 'react-redux';

import { Dialog } from 'primereact/dialog';

class HFNModalPopup extends Component {
  render() {
    return (
      <div>
        <Dialog {...this.props.mpd}>
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mpd: state.modalPopupDetails
});

export default connect(mapStateToProps)(HFNModalPopup);