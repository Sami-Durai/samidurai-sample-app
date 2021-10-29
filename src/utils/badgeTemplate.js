import React from "react";

//utils
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

export const amountBadge = (rowData, { field, header }) => {
  return (<React.Fragment>
    <span className="p-column-title"> {header} </span>
    {(rowData[field]) ?
      <span className="hfn-datatable-td" title={rowData.currency ? (rowData[field] + " " + rowData.currency) : rowData[field]}>
        {rowData.currency ? (rowData[field] + " " + rowData.currency) : rowData[field]}
      </span>
      :
      <span className="hfn-datatable-td"> - </span>}
  </React.Fragment>)
};


export const createdDateBadge = (rowData, { field, header }) => {
  return (<React.Fragment>
    <span className="p-column-title"> {header} </span>
    {(rowData[field]) ?
      <span className="hfn-datatable-td" title={getDateString(rowData[field])}> {getDateString(rowData[field])} </span>
      :
      <span className="hfn-datatable-td"> - </span>}
  </React.Fragment>)
};

export const boolBadge = (rowData, { field, header }) => {
  return (<React.Fragment>
    <span className="p-column-title"> {header} </span>
    {(typeof rowData[field] === "boolean") ?
      <span className="hfn-datatable-td" title={rowData[field] ? "Yes" : "No"}> {rowData[field] ? "Yes" : "No"} </span>
      :
      <span className="hfn-datatable-td"> - </span>}
  </React.Fragment>)
}
