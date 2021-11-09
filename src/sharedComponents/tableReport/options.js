const options = {
  service: null,

  method: "",

  urlPath: "",

  params: null,

  tablePrimeConfig: {
    emptyMessage: "No data found.",
    lazy: true,
    autoLayout: true
  },

  responsive: false,

  layout: (window.screen.width > 767) ? "list" : "grid",

  columns: [],

  first: 0,

  rows: 10,

  page: 1,

  sortField: null,

  sortOrder: 1,

  pagination: {
    prevPageLink: {
      isPrevPageLink: true,
      classNames: ""
    },
    nextPageLink: {
      isNextPageLink: true,
      classNames: ""
    },
    pageLinks: {
      isPageLinks: true,
      classNames: ""
    },
    rowsPerPageDropdown: {
      isRowPerPage: true,
      dropdownOptions: [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ],
      classNames: ""
    },
    currentPageReport: {
      isPageResult: true,
      shortResult: false,
      isPageNavigator: false,
      classNames: ""
    }
  },

  actionBtnOptions: [
    {
      icon: "uil uil-pen edit-icon",
      className: "p-mr-2",
      title: "Edit Item",
    },
    {
      icon: "uil uil-trash-alt remove-icon",
      className: "",
      title: "Delete Item",
    }
  ],

  enableActionColumn: false,

  enableCardsView: false,

  enableReport: false,

  reportBtn: {
    label: "Export",
    icon: "pi pi-file-o",
    classNames: "p-button-primary",
    headers: null,
    fileName: "Report",
    timestampSuffix: "DDMMYYYYHHmmss",
    fileExtension: ".csv"
  }
};

export default options;
