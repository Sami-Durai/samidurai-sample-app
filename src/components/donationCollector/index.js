import React, { Component } from "react";

// components
// shared components 
import HFNDataTable from "../../shared-components/datatable/HFNDataTable";

// utils 
import buildBreadcrumb from "../../utils/breadcrumb";

// services 
import DCService from "../../services/donationCollector/donationCollector.service";

class DonationCollectors extends Component {
  constructor(props) {
    super(props);

    // variable init start
    this.dcService = new DCService();

    this.breadcrumbs = [
      { label: "Dashboard", url: "dashboard", icon: "pi pi-home" },
      { label: "Donation Collector", url: "donation-collector" }
    ];
    // variable init end

    // state management start
    this.state = {
      options: {
        tablePrimeConfig: {
          autoLayout: true,
          lazy: false,
          scrollable: true,
          scrollHeight: "500px",
        },

        url: this.dcService,

        method: "getDonationCollectors",

        columns: [
          {
            header: "Name",
            field: "name",
            sortable: true,
            filter: true,
            filterMatchMode: 'contains',
            headerStyle: {
              width: "150px"
            }
          },
          {
            header: "Email",
            field: "email",
            sortable: true,
            filter: true,
            filterMatchMode: 'contains',
            headerStyle: {
              width: "200px"
            },
            transformValue: false
          },
          {
            header: "State",
            field: "state",
            sortable: true,
            filter: true,
            filterMatchMode: 'contains',
            headerStyle: {
              width: "150px"
            }
          },
          {
            header: "Country",
            field: "country",
            sortable: true,
            filter: true,
            filterMatchMode: 'contains',
            headerStyle: {
              width: "150px"
            }
          },
          {
            header: "Status",
            field: "status.name",
            sortable: true,
            headerStyle: {
              width: "120px"
            }
          },
          {
            header: "Created On",
            field: "created_at",
            sortable: true,
            headerStyle: {
              width: "120px"
            }
          }
        ],

        enableActionColumn: false,

        toolBarBtnOptions: {
          title: "Donation Collector List",
          rightBtnsOptions: [
            { visibility: false }
          ]
        }
      }
    };
    // state management end
  }


  componentDidMount() {
    buildBreadcrumb(this.breadcrumbs);
  }

  render() {
    return (
      <div>
        <HFNDataTable options={this.state.options} />
      </div>
    )
  }
}

export default DonationCollectors;
