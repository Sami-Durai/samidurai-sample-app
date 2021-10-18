import React from "react";

// store 
import { useSelector } from "react-redux";

import { Dialog } from "primereact/dialog";

const Popup = ({ children }) => {
  const popupProps = useSelector(state => state.modalPopupDetails);

  return (
    <div>
      <Dialog {...popupProps}>
        {children}
      </Dialog>
    </div>
  );
};

export default Popup;
