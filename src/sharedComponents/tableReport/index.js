import React, { memo, useState, useRef, useMemo, useCallback } from "react";

// components
// prime components
import { Button } from "primereact/button";

// shared components
import HFNLoading from "sharedComponents/lazyLoading/Loading";

import HFNDynamicForm from "sharedComponents/hfnForm";

import HFNTable from "sharedComponents/tableReport/table";

// utils
import { isEmpty, merge, pickBy } from "lodash";

import toaster from "utils/toaster";

// options
import optionsDefaultValue from "sharedComponents/tableReport/options";

const TableReport = ({ options, fields, initialValues }) => {
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({});

  const table = useRef(null);

  const [reportOptions, formFields, initValues] = useMemo(() => ([
    merge({}, optionsDefaultValue, options),
    fields,
    initialValues
  ]), []);

  const formButtonGroup = useCallback(() => (
    <div className="report-form-button-group">
      <Button type="submit" label="Generate Report" className="p-button p-button-primary" />
    </div>
  ), []);

  const formOnsubmit = useCallback((data, error) => {
    if (isEmpty(error)) {
      setLoading(true);

      const formData = Object.assign({}, initialValues, data);
      const validFilters = pickBy(formData, (item) => item !== null && item !== undefined && item !== "");

      if (isEmpty(validFilters)) {
        toaster.error("Provide minimum one filter")
        setLoading(false);
        return;
      }

      setFilters(validFilters);

      if (table.current)
        table.current.loadData({ filters: validFilters });
    }
  }, []);

  return (
    <>
      {loading ? <HFNLoading /> : null}

      <div className="report-section p-mt-3 p-mb-4">
        <div className="p-card p-mb-4">
          <div className="p-card-body">
            <h4 className="report-title">{reportOptions.title}</h4>
            <HFNDynamicForm
              initialValues={initValues}
              fields={formFields}
              onFormSubmit={formOnsubmit}
              submitButtonGroup={formButtonGroup}
            />
          </div>
        </div>

        <HFNTable ref={table} options={reportOptions} showLoading={setLoading} filters={filters} />
      </div>
    </>
  );
};

export default memo(TableReport);
