import React, { useEffect, useRef, useMemo } from "react";

// components
//shared components
import HFNReport from "sharedComponents/tableReport";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import dropdown from "utils/dropdown";

// services
import ReportsService from "services/reports/reports.service";

// constants
const breadcrumbs = [
  { label: "Dashboard", url: "dashboard", icon: "pi pi-home" },
  { label: "Donation Report", url: "reports", }
];

const initialValues = {};

const Reports = () => {
  useEffect(() => {
    buildBreadcrumb(breadcrumbs);
    dropdown.ashram();
    dropdown.organization();
    dropdown.country();
  }, []);

  const reportsService = useRef(new ReportsService());

  const options = useMemo(() => ({
    title: "Donation Report",

    service: reportsService.current,

    method: "getDonationReport",

    columns: [
      {
        header: "Country",
        field: "country",
        sortable: true,
        headerStyle: {
          minWidth: "150px"
        }
      },
      {
        header: "Organization",
        field: "organization",
        sortable: true,
        headerStyle: {
          minWidth: "150px"
        }
      },
      {
        header: "Ashram",
        field: "ashram",
        sortable: true,
        headerStyle: {
          minWidth: "150px"
        }
      },
      {
        header: "Transaction Date",
        field: "txtn_date",
        sortable: true,
        headerStyle: {
          minWidth: "150px"
        }
      },
      {
        header: "Name",
        field: "name",
        sortable: true,
        headerStyle: {
          minWidth: "150px"
        },
        transformValue: false
      },
      {
        header: "Email",
        field: "email",
        sortable: true,
        headerStyle: {
          minWidth: "150px"
        },
        transformValue: false
      },
      {
        header: "Amount",
        field: "amount",
        sortable: true,
        headerStyle: {
          minWidth: "100px"
        }
      }
    ],

    enableCardsView: true,

    enableReport: true,

    reportBtn: {
      fileName: "Donation_Report",
      headers: [
        {
          label: "Country",
          key: "country"
        },
        {
          label: "Organization",
          key: "organization"
        },
        {
          label: "Ashram",
          key: "ashram"
        },
        {
          label: "Transaction Date",
          key: "txtn_date"
        },
        {
          label: "Name",
          key: "name"
        },
        {
          label: "Email",
          key: "email"
        },
        {
          label: "Amount",
          key: "amount"
        },
        {
          label: "Address",
          key: "address"
        },
        {
          label: "City",
          key: "city"
        }
      ]
    }
  }), []);

  const formFields = useMemo(() => ({
    from_date: {
      properties: {
        type: "Calendar",
        label: "Transaction From Date",
        fieldWrapperClassNames: "p-md-6 p-lg-4 p-xl-3",
        primeFieldProps: {
          readOnlyInput: true,
          dateFormat: "M dd, yy",
          maxDate: new Date(),
          showButtonBar: true,
          todayButtonClassName: "p-button-secondary p-ml-2",
          clearButtonClassName: "p-button-secondary p-mr-2"
        }
      }
    },

    to_date: {
      properties: {
        type: "Calendar",
        label: "Transaction To Date",
        fieldWrapperClassNames: "p-md-6 p-lg-4 p-xl-3",
        primeFieldProps: {
          readOnlyInput: true,
          dateFormat: "M dd, yy",
          maxDate: new Date(),
          showButtonBar: true,
          todayButtonClassName: "p-button-secondary p-ml-2",
          clearButtonClassName: "p-button-secondary p-mr-2"
        }
      }
    },

    country: {
      properties: {
        type: "Select",
        label: "Country",
        fieldWrapperClassNames: "p-md-6 p-lg-4 p-xl-3",
        primeFieldProps: { isClearable: true },
        dropdownOptions: "country"
      }
    },

    ashram: {
      properties: {
        type: "Select",
        label: "Ashram",
        fieldWrapperClassNames: "p-md-6 p-lg-4 p-xl-3",
        primeFieldProps: { isClearable: true },
        dropdownOptions: "ashram"
      }
    },

    organization: {
      properties: {
        type: "Select",
        label: "Organization",
        fieldWrapperClassNames: "p-md-6 p-lg-4 p-xl-3",
        primeFieldProps: { isClearable: true },
        dropdownOptions: "organization"
      }
    }
  }), []);

  return (
    <HFNReport fields={formFields} initialValues={initialValues} options={options} />
  );
};

export default Reports;
