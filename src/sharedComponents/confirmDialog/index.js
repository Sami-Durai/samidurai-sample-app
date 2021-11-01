import React from "react";

// state 
import { useSelector } from "react-redux";

// components
// prime components
import { ConfirmDialog } from "primereact/confirmdialog";

const HFNConfirmDialog = () => {
  const popupProps = useSelector(state => state.confirmDialogDetails);

  return (
    <ConfirmDialog {...popupProps} />
  );
};

export default HFNConfirmDialog;
