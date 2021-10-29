import React, { Component } from 'react';

// state
import { connect } from "react-redux";

// components
import { CSVLink } from "react-csv";

import { Toolbar } from 'primereact/toolbar';

import { Dropdown } from 'primereact/dropdown';

import { Button } from 'primereact/button';

import { DataViewLayoutOptions } from "primereact/dataview";

// utils
import moment from 'moment';

class HFNDatatableToolbar extends Component {

  constructor(props) {

    super(props);

    this.csvRef = React.createRef();

    this.state = {
      status: null,

      fileName: "",

      data: []
    }

  }

  resetStatus = () => {
    this.setState({ status: null })
  }

  getSelections = () => {
    return {
      selections: this.props.selections,
      status: this.state.status
    }
  }

  exportSelectionToCSV = () => {
    const reportBtnsOptions = this.props.toolBarOptions.selection.reportBtnsOptions;
    let fileName = reportBtnsOptions.fileName, reportData = this.props.selections;
    try {
      if (reportBtnsOptions.timestampSuffix) {
        const timestampSuffix = moment().format(reportBtnsOptions.timestampSuffix);
        if (timestampSuffix) {
          fileName += "_" + timestampSuffix;
        }
      }
      fileName += reportBtnsOptions.fileExtension;
      if (typeof reportBtnsOptions.generateReportData === 'function') {
        reportData = reportBtnsOptions.generateReportData(reportData)
      }
      this.setState({ fileName: fileName, data: reportData }, () => {
        setTimeout(() => {
          if (this.csvRef.current) {
            this.csvRef.current.link.click();
          }
        })
      })
    }
    catch {
      this.setState({ loading: false });
    }
  }

  render() {


    let defaultOption = [{ label: "", value: "" }], filterOptions = [], rightContents, updateCheck, deleteCheck, rightBtnCheck;

    const { toolBarOptions, enableSelection } = this.props;

    const leftContents = (
      <div className="datatable-title">
        {
          (toolBarOptions) ? <h4>{toolBarOptions.title}</h4> : null
        }
      </div>
    )

    filterOptions = this.props.dd[toolBarOptions.selection.field.options];

    updateCheck = toolBarOptions.selection.enableUpdate;
    deleteCheck = toolBarOptions.selection.enableDelete;

    rightContents = (
      <React.Fragment>

        {
          (enableSelection && toolBarOptions.selection.enableBulkEdit) &&
          <div className="bulk-edit-wrapper">

            <h3 className={toolBarOptions.selection.titleClassNames}>{toolBarOptions.selection.title}</h3>

            <div className="bulk-edit-btn-wrapper">
              {updateCheck &&
                <div className="bulk-edit-update">
                  <Dropdown
                    className={toolBarOptions.selection.field.classNames}
                    options={[...defaultOption, ...filterOptions]}
                    optionLabel={toolBarOptions.selection.field.label}
                    value={this.state.status}
                    onChange={(e) => { this.setState({ status: e.value }) }}
                    placeholder={toolBarOptions.selection.field.placeholder}
                  >
                  </Dropdown>
                  <Button
                    label={toolBarOptions.selection.updateBtnsOptions.label}
                    icon={toolBarOptions.selection.updateBtnsOptions.icon}
                    className={`${toolBarOptions.selection.updateBtnsOptions.classNames}`}
                    disabled={!this.props.selections || !this.props.selections.length || !this.state.status}
                    onClick={() => { toolBarOptions.selection.updateBtnsOptions.onClick(this.getSelections()) }}
                  />
                </div>
              }
              {deleteCheck &&
                <Button
                  label={toolBarOptions.selection.deleteBtnsOptions.label}
                  icon={toolBarOptions.selection.deleteBtnsOptions.icon}
                  className={`${toolBarOptions.selection.deleteBtnsOptions.classNames}`}
                  disabled={!this.props.selections || !this.props.selections.length || !!this.state.status}
                  onClick={() => { toolBarOptions.selection.deleteBtnsOptions.onClick(this.getSelections()) }}
                />
              }
            </div>

          </div>
        }

        {(enableSelection && toolBarOptions.selection.enableReport)
          ?
          <>
            <Button
              label={toolBarOptions.selection.reportBtnsOptions.label}
              icon={toolBarOptions.selection.reportBtnsOptions.icon}
              className={`${toolBarOptions.selection.reportBtnsOptions.classNames}`}
              disabled={!this.props.selections || !this.props.selections.length}
              onClick={() => this.exportSelectionToCSV()}
            />
            <CSVLink
              className="report-csv-button-hidden"
              ref={this.csvRef}
              data={this.state.data || []}
              filename={this.state.fileName}
              headers={toolBarOptions.selection.reportBtnsOptions.headers}
            />
          </>
          :
          <></>
        }

        {
          // eslint-disable-next-line array-callback-return
          (toolBarOptions) ? toolBarOptions.rightBtnsOptions.map((item, index) => {
            rightBtnCheck = item.visibility;

            if ((rightBtnCheck === true) && (typeof item.visibilityCheck === 'function')) {
              rightBtnCheck = item.visibilityCheck();
            }

            if (rightBtnCheck) {
              return <div className={`add-new-btn-wrapper ${(toolBarOptions.selection.enableBulkEdit) ? 'add-new-btn-wrapper-end' : ''}`} key={index}>

                <div className={"p-text-left p-p-0" + (this.props.enableCardsView ? (enableSelection ? " layout-options" : " p-col-6") : "")}>
                  {this.props.enableCardsView ?
                    <DataViewLayoutOptions
                      className={enableSelection ? "p-d-none" : ""}
                      layout={this.props.layout}
                      onChange={(e) => this.props.handleTableState("layout", e.value)}
                    />
                    : null}
                </div>
                <Button title={item.title} label={item.label} icon={item.icon} className={`${item.classNames}`} onClick={(ev) => { item.onClick(ev) }} />
              </div>
            }
          }) : <></>
        }

      </React.Fragment>
    );

    return (
      <div>
        <Toolbar left={leftContents} right={rightContents} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dd: state.dropdownDetails,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(HFNDatatableToolbar);
