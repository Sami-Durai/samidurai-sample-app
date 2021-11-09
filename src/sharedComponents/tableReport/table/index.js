import React, { memo, useState, useRef, useMemo, useCallback, forwardRef, useImperativeHandle } from "react";

// components
import { CSVLink } from "react-csv";

// primereact components
import { DataTable } from "primereact/datatable";

import { Button } from "primereact/button";

import { Column } from "primereact/column";

import { DataViewLayoutOptions } from "primereact/dataview";

// shared-components
import HFNDataTablePagination from "sharedComponents/datatable/HFNDataTablePagination";

// utils
import moment from "moment";

import { isEmpty, isString, upperFirst } from "lodash";

const Table = forwardRef(({ options, showLoading, filters }, ref) => {
  const [tableData, setTableData] = useState({
    loading: false,
    totalRecords: 0,
    data: [],
  });

  const [sorting, setSorting] = useState({
    sortField: options.sortField,
    sortOrder: options.sortOrder
  });

  const [pageData, setPageData] = useState({
    first: options.first,
    rows: options.rows,
    page: options.page
  });

  const [layout, setLayout] = useState(options.enableCardsView ? options.layout : (options.layout || "list"));

  const [reportData, setReportData] = useState({ loading: false, fileName: "", data: [] });

  const csvRef = useRef(null);

  const [
    {
      tablePrimeConfig,
      service,
      method,
      urlPath,
      params,
      columns,
      pagination,
      enableActionColumn,
      enableCardsView,
      enableReport,
      reportBtn
    },
    showLoader
  ] = useMemo(() => ([
    {
      ...options,
      tablePrimeConfig: {
        ...options.tablePrimeConfig,
        className: (options.tablePrimeConfig.className || "") + (options.responsive ? " responsive-datatable" : "")
      }
    },
    showLoading
  ]), []);

  const loadData = useCallback(async (payload) => {
    setTableData({ loading: true, totalRecords: tableData.totalRecords, data: tableData.data });

    try {
      if (service && method) {
        const inputData = Object.assign({}, {
          sortField: sorting.sortField,
          sortOrder: sorting.sortOrder,
          filters: filters,
          first: pageData.first,
          rows: pageData.rows,
          page: pageData.page
        }, payload);

        let apiResponse = await service[method](inputData, params, urlPath);

        if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results))
          setTableData({ loading: false, totalRecords: apiResponse.data.count, data: apiResponse.data.results });
        else
          setTableData({ loading: false, totalRecords: 0, data: [] });
      }
      else
        setTableData({ loading: false, totalRecords: 0, data: [] });
    }
    catch {
      console.log("Something went wrong.");
      setTableData({ loading: false, totalRecords: 0, data: [] });
    }

    showLoader(false);
  }, [sorting, filters, pageData]);

  useImperativeHandle(ref, () => ({
    loadData: loadData
  }), [loadData]);

  const onPageChange = useCallback(event => {
    setPageData({ first: event.first, rows: event.rows, page: event.page + 1 });
    loadData({ first: event.first, rows: event.rows, page: event.page + 1 });
  }, [loadData]);

  const onSort = useCallback(({ sortField, sortOrder }) => {
    if (sortField) {
      setSorting({ sortField: sortField, sortOrder: sortOrder });
      loadData({ sortField: sortField, sortOrder: sortOrder });
    }
  }, [loadData]);

  const lookup = useCallback((obj, key) => {
    return key.split(".").reduce((o, k) => o && o[k], obj);
  }, []);

  const transformBodyTemplate = useCallback((rowData, { field, header }) => {
    let data = lookup(rowData, field);
    if (data || (data === 0)) {
      return (<React.Fragment>
        <span className="p-column-title"> {header} </span>
        {(isString(data)) ?
          <span className="hfn-datatable-td" title={upperFirst(data)}> {upperFirst(data)} </span>
          :
          <span className="hfn-datatable-td" title={data}> {data} </span>}
      </React.Fragment>)
    }
    else {
      return (<React.Fragment>
        <span className="p-column-title"> {header} </span>
        <span className="hfn-datatable-td"> - </span>
      </React.Fragment>)
    }
  }, []);

  const defaultBodyTemplate = useCallback((rowData, { field, header }) => {
    let data = lookup(rowData, field);
    return (<React.Fragment>
      <span className="p-column-title"> {header} </span>
      {(!isEmpty(data) || (data === 0)) ?
        <span className="hfn-datatable-td" title={data}> {data} </span>
        :
        <span className="hfn-datatable-td"> - </span>}
    </React.Fragment>)
  }, []);

  const actionColumnTemplate = useCallback(rowData => {
    return (
      <React.Fragment>
        <span className="p-column-title"> Action </span>
        <span className="actions">
          {this.state.actionBtnOptions.map((option, index) => {
            let buttonOption = { ...option };
            let actionBtnCheck = option.visibility !== false;

            if ((actionBtnCheck === true) && (typeof option.visibilityCheck === "function")) {
              actionBtnCheck = option.visibilityCheck(rowData);
              delete buttonOption.visibilityCheck;
            }

            if (actionBtnCheck) {
              return <Button key={index} {...buttonOption} onClick={ev => { option.onClick(ev, rowData); }} />
            }
          })}
        </span>
      </React.Fragment>
    );
  }, []);

  const exportSelectionToCSV = useCallback(async () => {
    setReportData({ loading: true, fileName: "", data: [] });

    try {
      const reportService = reportBtn.service || service;
      const reportMethod = reportBtn.method || method;
      const reportURLPath = reportBtn.urlPath || urlPath;
      const reportParams = reportBtn.params || params;

      if (reportService && reportMethod) {
        const inputData = {
          sortField: sorting.sortField,
          sortOrder: sorting.sortOrder,
          filters: filters,
          first: pageData.first,
          rows: pageData.rows,
          page: pageData.page
        };

        let apiResponse = await reportService[reportMethod](inputData, reportParams, reportURLPath);

        if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results)) {
          let fileName = reportBtn.fileName, data = apiResponse.data.results;

          if (reportBtn.timestampSuffix) {
            const timestampSuffix = moment().format(reportBtn.timestampSuffix);
            if (timestampSuffix) {
              fileName += "_" + timestampSuffix;
            }
          }
          fileName += reportBtn.fileExtension;

          if (typeof reportBtn.generateReportData === "function") {
            data = reportBtn.generateReportData(data);
          }

          setReportData({ loading: true, fileName: fileName, data: data });
          setTimeout(() => {
            if (csvRef.current) {
              csvRef.current.link.click();
              setReportData({ loading: false, fileName: "", data: [] });
            }
          });
        }
        else
          setReportData({ loading: false, fileName: "", data: [] });
      }
      else
        setReportData({ loading: false, fileName: "", data: [] });
    }
    catch {
      console.log("Something went wrong.");
      setReportData({ loading: false, fileName: "", data: [] });
    }
  }, [filters])

  return (
    <div className={`hfn-datatable ${tablePrimeConfig.lazy ? "hfn-datatable-lazy" : ""}`}>

      {(enableCardsView || enableReport) ?
        <div className="report-toolbar p-mx-1 p-pb-2">
          <div className={"p-text-left p-p-0" + (enableReport ? " p-col-6" : "")}>
            {
              enableCardsView ?
                <DataViewLayoutOptions
                  className="p-text-left"
                  layout={layout}
                  onChange={(e) => setLayout(e.value)}
                />
                : null}
          </div>

          <div className="p-text-right">
            {
              enableReport ?
                <>
                  <Button
                    label={reportBtn.label}
                    icon={reportBtn.icon}
                    className={reportBtn.classNames}
                    disabled={reportData.loading || (tableData.totalRecords === 0) || tableData.loading}
                    onClick={exportSelectionToCSV}
                  />
                  <CSVLink
                    className="report-csv-button-hidden"
                    ref={csvRef}
                    data={reportData.data || []}
                    filename={reportData.fileName}
                    headers={reportBtn.headers}
                  />
                </>
                : null
            }
          </div>
        </div>
        : null}

      <DataTable
        loading={tableData.loading}
        totalRecords={tableData.totalRecords}
        value={tableData.data}
        first={pageData.first}
        rows={pageData.rows}
        sortField={sorting.sortField}
        sortOrder={sorting.sortOrder}
        paginator
        paginatorTemplate={HFNDataTablePagination(pagination)}
        onPage={onPageChange}
        onSort={onSort}
        {...tablePrimeConfig}
        className={tablePrimeConfig.className + (layout === "grid" ? " cards-datatable" : "")}
      >

        {columns.map((item, index) => {

          if ((typeof item.body !== "function") && !item.showOriginalValue) {
            item.body = (item.transformValue !== false) ? transformBodyTemplate : defaultBodyTemplate;
          }
          return <Column {...item} key={index} />
        })}

        {
          (enableActionColumn === true) &&
          <Column className="p-action-column" body={actionColumnTemplate} header="Actions" style={{ minWidth: "100px" }} />
        }

      </DataTable>

    </div>
  );
});

export default memo(Table);
