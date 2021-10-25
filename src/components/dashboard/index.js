import React, { useEffect } from "react";

// utils 
import buildBreadcrumb from "utils/breadcrumb";
// constants
const breadcrumbs = [
  { label: "Dashboard", url: "dashboard", icon: 'pi pi-home' }
];


const Dashboard = () => {
  useEffect(() => {
    buildBreadcrumb(breadcrumbs);
  }, []);

  return (
    <>
      Dashboard contents will be displayed here after development.
    </>
  );
};

export default Dashboard;
