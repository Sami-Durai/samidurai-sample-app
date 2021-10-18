import React from "react";

//utils
import { isEmpty } from "lodash";

import { getDateString } from "utils/common";

const statusBadge = (rowData, { field }) => {
  let status = rowData[field];
  let slug = "";
  if (!isEmpty(rowData.status)) {
    if (!isEmpty(rowData.status.status_name)) status = rowData.status.status_name;
    if (!isEmpty(rowData.status.status_slug)) slug = "p-badge status-" + rowData.status.status_slug;
  }

  return slug ? <div className={slug}>{status}</div> : status;
};


const createdDateBadge = (rowData, { field }) => {
  return (!isEmpty(rowData[field])) ? <div className="hfn-datatable-td" title={getDateString(rowData[field])}>{getDateString(rowData[field])}</div> : "-";
};

export {
  statusBadge,
  createdDateBadge
};
