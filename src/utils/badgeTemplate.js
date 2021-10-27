import React from "react";

//utils
import { isEmpty } from "lodash";

import { getDateString } from "utils/common";

export const ObjArrayBadge = (rowData, { field }) => {
  if (Array.isArray(rowData[field])) {
    return (
      <ul className="p-pl-2">
        {rowData[field].map(({ name, id }) => {
          return <li key={id} title={name || ""}> {name || "-"} </li>
        })}
      </ul>
    )
  }
  else
    return ""
};

export const statusBadge = (rowData, { field }) => {
  let status = rowData[field];
  let slug = "";
  if (!isEmpty(rowData.status)) {
    if (!isEmpty(rowData.status.status_name)) status = rowData.status.status_name;
    if (!isEmpty(rowData.status.status_slug)) slug = "p-badge status-" + rowData.status.status_slug;
  }

  return slug ? <div className={slug}>{status}</div> : status;
};

export const createdDateBadge = (rowData, { field }) => {
  return (!isEmpty(rowData[field])) ? <div className="hfn-datatable-td" title={getDateString(rowData[field])}>{getDateString(rowData[field])}</div> : "-";
};

export const boolBadge = (rowData, { field }) => {
  return (
    (typeof rowData[field] === "boolean")
      ?
      <div className="hfn-datatable-td" title={rowData[field] ? "Yes" : "No"}> {rowData[field] ? "Yes" : "No"} </div>
      :
      "-"
  );
}
