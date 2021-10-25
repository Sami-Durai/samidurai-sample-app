import React, { Component } from 'react'

// utils
import moment from 'moment';

import { classNames } from 'primereact/utils';

// components
import { CSVLink } from "react-csv";

// prime components 
import { Paginator } from 'primereact/paginator';

import fileDownload from 'assets/icons/download_file.png'

class ReportDownload extends Component {

  constructor(props) {

    super(props);

    this.csvButton = React.createRef(null);

    const { service, method, columns, fileName, params, rows, timestampSuffix, csvExtension, first } = this.props.options;

    this.state = {
      reportData: [],
      service: service,
      method: method,
      columns: columns,
      fileName: fileName,
      params: params,
      rows: rows,
      timestampSuffix: timestampSuffix,
      csvExtension: csvExtension,
      first: first,
    }

  }

  exportCSV = (data, page) => {
    let fileName = this.props.options.fileName + "_Page_" + page + "_" + moment().format(this.state.timestampSuffix) + ".csv";
    this.setState({ reportData: data }, () => {
      this.setState({ fileName: fileName }, () => {
        this.csvButton.current.link.click();
      });
    });
  }

  onPageChange = async (ev) => {

    try {

      let payload;

      const { filters } = this.props;

      ev.page = ev.page + 1;

      delete ev.pageCount;

      ev.filters = filters;

      payload = {
        "lazyEvent": ev
      }

      this.setState({ first: ev.first, rows: ev.rows });

      if (ev.page === 1 && this.props.data && this.props.data.data) {
        this.exportCSV(this.props.data.data, ev.page);
      } else {

        let apiResponse, apiResponseData;

        apiResponse = await this.state.service[this.state.method](payload)

        if (apiResponse && apiResponse.data && apiResponse.data.data) {
          apiResponseData = apiResponse.data.data;
          this.exportCSV(apiResponseData, ev.page);
        }

      }

    } catch (err) {
      console.log(err)
    }

  }

  render() {

    const { data } = this.props;

    const { rows, first, reportData, columns, fileName } = this.state;

    const CSVDownloadTemplate = {
      layout: 'PageLinks',
      'PrevPageLink': (options) => {
        return (
          <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
            <span className="p-paginator-icon pi pi-angle-left"></span>
          </button>
        )
      },
      'NextPageLink': (options) => {
        return (
          <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
            <span className="p-paginator-icon pi pi-angle-right"></span>
          </button>
        )
      },
      'PageLinks': (options) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
          const className = classNames(options.className, { 'p-disabled': true });
          return <span className={className} style={{ userSelect: 'none' }}>...</span>;
        }

        return (
          <button type="button" className={"page-link " + options.className} onClick={options.onClick}>
            <span className="hfn-fd-num">{options.page + 1}</span>
            <img src={fileDownload} alt="hfn-file-download" />
          </button>
        )
      },
    };
    
    return (
      <>
        <div>
          {
            data.count
              ?
              <div className="csv-pagination-download">
                <Paginator template={CSVDownloadTemplate} first={first} rows={rows} totalRecords={data.count} onPageChange={this.onPageChange}></Paginator>
              </div>
              :
              <></>
          }
          <CSVLink ref={this.csvButton} filename={fileName} data={reportData} headers={columns}></CSVLink>
        </div>
      </>
    )
  }
}

export default ReportDownload;