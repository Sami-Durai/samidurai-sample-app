import React, { Suspense } from "react";

const DelayedFallback = () => {
  return (
    <div className="lds-roller-wrapper">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

const HFNLoader = ({ children }) => {
  return <Suspense fallback={<DelayedFallback />}> {children} </Suspense>;
};

export default HFNLoader;
