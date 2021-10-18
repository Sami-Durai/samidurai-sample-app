import React, { useEffect, useRef } from "react";

// components
// prime components
import { Toast } from "primereact/toast";

// utils 
import { toaster } from "utils/toaster";

const Toaster = () => {
  const toast = useRef(null);

  useEffect(() => {
    toaster.setRef(toast);
  }, []);

  return <Toast ref={toast} onHide={() => { }} />;
};

export default Toaster;
