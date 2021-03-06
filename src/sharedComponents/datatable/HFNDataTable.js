import React from "react";

// state
import { connect } from "react-redux";

// utils 
import { merge, isEmpty, isString, upperFirst } from "lodash";

// primereact components 
import { Button } from "primereact/button";

import { Dropdown } from "primereact/dropdown";

import { Calendar } from "primereact/calendar";

import { DataTable } from "primereact/datatable";

import { Column } from "primereact/column";

import { DataViewLayoutOptions } from "primereact/dataview";

// shared-components
import HFNDatatableToolbar from "sharedComponents/datatable/HFNDatatableToolbar";

import HFNDataTablePagination from "sharedComponents/datatable/HFNDataTablePagination";

// options
import { optionsDefaultValue } from "sharedComponents/datatable/options";

class HFNDataTable extends React.PureComponent {

  constructor(props) {

    super(props);

    const {
      privilege,
      tablePrimeConfig,
      url,
      method,
      urlPath,
      params,
      lazyParams,
      responsive,
      enableCardsView,
      layout,
      columns,
      pagination,
      enableActionColumn,
      actionBtnOptions,
      toolBarBtnOptions,
      enableSelection
    } = merge({}, optionsDefaultValue, this.props.options)

    this.toolBarRef = React.createRef(null);

    this.state = {

      privilege: privilege,

      tablePrimeConfig: {
        ...tablePrimeConfig,
        className: responsive ? (tablePrimeConfig.className || "") + " responsive-datatable" : (tablePrimeConfig.className || "")
      },

      url: url,

      method: method,

      urlPath: urlPath,

      params: params,

      responsive: responsive,

      enableCardsView: enableCardsView,

      layout: enableCardsView ? layout : (this.props.options.layout || "list"),

      columns: columns,

      pagination: pagination,

      enableActionColumn: enableActionColumn,

      actionBtnOptions: actionBtnOptions,

      loading: false,

      lazyParams: lazyParams,

      first: lazyParams.first,

      rows: lazyParams.rows,

      currentPage: lazyParams.page,

      pageInputTooltip: "Press \"Enter\" key to go to this page.",

      totalRecords: 0,

      data: null,

      globalFilter: null,

      toolBarBtnOptions: toolBarBtnOptions,

      selections: null,

      enableSelection: enableSelection

    };

  }

  loadData = async () => {
    this.setState({ loading: true });

    try {
      if (this.state.url && this.state.method) {

        let tableResponse = await this.state.url[this.state.method]({ lazyEvent: this.state.lazyParams, ...this.state.params }, this.state.urlPath)

        if (tableResponse && tableResponse.data && !tableResponse.data.isError && Array.isArray(tableResponse.data.results)) {
          this.setState({
            totalRecords: parseInt(tableResponse.data.count),
            data: tableResponse.data.results,
            loading: false
          });
        }
        else {
          this.setState({
            totalRecords: 0,
            data: [],
            loading: false
          });
        }
      }
    }
    catch {
      this.setState({ loading: false });
    }
  }

  onPageChange = (event) => {
    if (this.state.tablePrimeConfig.lazy) {
      this.setState(
        {
          lazyParams: {
            ...this.state.lazyParams,
            first: event.first,
            rows: event.rows,
            page: event.page + 1
          }
        },
        () => { this.loadData() }
      );
    } else {
      this.setState({
        first: event.first,
        rows: event.rows,
        currentPage: event.page + 1
      });
    }
  }

  onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(this.state.currentPage);
      if (page < 0 || page > options.totalPages) {
        this.setState({ pageInputTooltip: `Value must be between 1 and ${options.totalPages}.` })
      }
      else {
        const first = this.state.currentPage ? options.rows * (page - 1) : 0;
        this.setState({ first: first, pageInputTooltip: "Press \"Enter\" key to go to this page." });
      }
    }
  }

  onPageInputChange = (event) => {
    this.setState({ currentPage: event.target.value });
  }

  // template section 

  actionColumnTemplate = (rowData) => {

    let actionBtnCheck;

    return (
      <React.Fragment>
        <span className="p-column-title"> Action </span>
        <span className="actions">
          {this.state.actionBtnOptions.map((option, index) => {
            let buttonOption = { ...option };

            actionBtnCheck = option.visibility !== false;

            if ((actionBtnCheck === true) && (typeof option.visibilityCheck === "function")) {
              actionBtnCheck = option.visibilityCheck(rowData);
              delete buttonOption.visibilityCheck;
            }

            if (actionBtnCheck) {
              return <Button key={index} {...buttonOption} onClick={ev => {
                option.onClick(ev, rowData);
              }}></Button>
            }

          })}
        </span>
      </React.Fragment>
    );
  };


  // lazy section start 
  onSort = (event) => {
    if (event.sortField && (event.sortField !== "SortingDisabled")) {
      setTimeout(() => {
        let lazyParams = { ...this.state.lazyParams, ...event };
        this.setState({ lazyParams }, this.loadData);
      }, 1000);
    }
  }

  onFilter = (event) => {
    setTimeout(() => {
      let lazyParams = { ...this.state.lazyParams, ...event };
      lazyParams["first"] = 0;
      lazyParams["page"] = 1;
      this.setState({ lazyParams }, this.loadData);
    }, 1000);
  }
  // lazy section end

  onSelectionChange = (ev) => {
    if (ev.originalEvent.target.className.includes("p-checkbox-box") || ev.originalEvent.target.className.includes("p-checkbox-icon"))
      this.setState({ selections: ev.value })
  }

  removeSelection = () => {
    this.setState({ selections: null })
    if (this.toolBarRef && this.toolBarRef.current) {
      this.toolBarRef.current.resetStatus();
    }
  }

  // filter states 
  handleFilterElement = ({ value }, colName, type, { filterField }) => {
    this.dt.filter(value, filterField ? filterField : colName, "startsWith");
    this.setState({ [colName]: value });
  }

  lookup = (obj, key) => {
    return key.split(".").reduce((o, k) => o && o[k], obj);
  }

  transformBodyTemplate = (rowData, { field, header }) => {
    let data = this.lookup(rowData, field);
    if (data || (data === 0)) {
      return (<React.Fragment>
        <span className="p-column-title"> {header} </span>
        {(isString(data)) ?
          <span className="hfn-datatable-td" title={upperFirst(data)}>{upperFirst(data)}</span>
          :
          <span className="hfn-datatable-td" title={data}>{data}</span>}
      </React.Fragment>)
    }
    else {
      return (<React.Fragment>
        <span className="p-column-title"> {header} </span>
        <span className="hfn-datatable-td">-</span>
      </React.Fragment>)
    }
  }

  defaultBodyTemplate = (rowData, { field, header }) => {
    let data = this.lookup(rowData, field);
    return (<React.Fragment>
      <span className="p-column-title"> {header} </span>
      {(!isEmpty(data) || (data === 0)) ?
        <span className="hfn-datatable-td" title={data}>{data}</span>
        :
        <span className="hfn-datatable-td">-</span>}
    </React.Fragment>)
  }
  
  handleTableState = (stateName, layout) => {
    this.setState({ [ stateName ]: layout });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {

    let DatatableLazyConfig, dataTableConfigs;

    if (this.state.tablePrimeConfig.lazy) {
      DatatableLazyConfig = {
        first: this.state.lazyParams.first,
        rows: this.state.lazyParams.rows,
        totalRecords: this.state.totalRecords,
        loading: this.state.loading,
        filters: this.state.lazyParams.filters,
        sortField: this.state.lazyParams.sortField,
        sortOrder: this.state.lazyParams.sortOrder,
        onFilter: this.onFilter,
        onSort: this.onSort,
      }
    } else {
      DatatableLazyConfig = {
        first: this.state.first,
        rows: this.state.rows,
        globalFilter: this.state.globalFilter
      }
    }

    dataTableConfigs = {
      ...DatatableLazyConfig,
      ...this.state.tablePrimeConfig,
    }

    if (this.state.layout === "grid")
      dataTableConfigs.className = (dataTableConfigs.className || "") + " cards-datatable";

    return (
      <div className={`hfn-datatable ${this.state.tablePrimeConfig.lazy ? "hfn-datatable-lazy" : ""}`}>

        <HFNDatatableToolbar
          ref={this.toolBarRef}
          tableRef={this.dt}
          tableColumns={this.state.columns}
          enableSelection={this.state.enableSelection}
          selections={this.state.selections}
          tableItems={this.state.data}
          toolBarOptions={this.state.toolBarBtnOptions}
          access={this.state.privilege}
          enableCardsView={this.state.enableCardsView}
          layout={this.state.layout}
          handleTableState={this.handleTableState}
        >
        </HFNDatatableToolbar>

        {(this.state.enableSelection && this.state.enableCardsView) ? 
          <DataViewLayoutOptions
            className="p-text-left layout-options-md p-pb-2"
            layout={this.state.layout}
            onChange={(e) => this.setState({ layout: e.value })}
          />
        : null }
        

        <DataTable
          ref={(el) => this.dt = el}
          value={this.state.data}
          paginator
          paginatorTemplate={HFNDataTablePagination(this.state.pagination)}
          onPage={this.onPageChange}
          selection={this.state.selections}
          onSelectionChange={this.onSelectionChange}
          {...dataTableConfigs}
        >

          {this.state.enableSelection && <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>}

          {this.state.columns.map((item, index) => {

            if ((typeof item.body !== "function") && !item.showOriginalValue) {
              item.body = (item.transformValue !== false) ? this.transformBodyTemplate : this.defaultBodyTemplate;
            }

            if (item.filterElementOptions) {

              let defaultOption, filterOptions;

              defaultOption = [{ label: "All", value: "" }];

              (!isEmpty(this.props.dd[item.filterElementOptions.value])) ?
                filterOptions = this.props.dd[item.filterElementOptions.value] :
                filterOptions = [];

              switch (item.filterElementOptions.type) {
                case "Dropdown":
                  return <Column {...item} key={index}
                    filterElement={
                      <Dropdown
                        {...item.filterElementOptions.primeFieldProps}
                        className="p-column-filter"
                        options={[...defaultOption, ...filterOptions]}
                        optionLabel="label"
                        value={this.state[item.field]}
                        filter={false}
                        onChange={(ev) => { this.handleFilterElement(ev, item.field, "dropdown", item) }}
                      >
                      </Dropdown>
                    }
                  />
                case "Calendar":
                  return <Column {...item} key={index}
                    filterElement={
                      <Calendar
                        className="p-column-filter"
                        value={this.state[item.field]}
                        readOnlyInput
                        dateFormat={"M dd, yy"}
                        showButtonBar
                        todayButtonClassName="p-button-secondary p-ml-2"
                        clearButtonClassName="p-button-secondary p-mr-2"
                        {...item.filterElementOptions.primeFieldProps}
                        onChange={(ev) => { this.handleFilterElement(ev, item.field, "calendar", item) }}
                      />
                    }
                  />
                default:
              }

            } else {
              return <Column {...item} key={index} />
            }

          })}

          {
            (this.state.enableActionColumn === true) &&
            <Column className="p-action-column" body={this.actionColumnTemplate} header="Actions" style={{ minWidth: "100px" }} />
          }

        </DataTable>

      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  dd: state.dropdownDetails,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(HFNDataTable);
