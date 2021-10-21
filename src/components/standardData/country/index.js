import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/standardData/country/Form";

// shared components 
import HFNDataTable from "sharedComponents/datatable/HFNDataTable";

import HFNModalPopup from "sharedComponents/modalPopup";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import response from "utils/response";

import confirmDialog from "utils/confirmDialog";

import modalPopup from "utils/modalPopup";

import { financeControllersBadge, createdDateBadge } from "utils/badgeTemplate";

import { setBulkStatus } from "utils/bulk";

import { getLoginID } from "utils/login";

import dropdown from "utils/dropdown";

// services 
import Service from "services/standardData/country.service";

// constants
const breadcrumbs = [
    { label: "Country", url: "", }
];

const formInitValue = {};

// page component
const Country = () => {
    const [formState, setFormState] = useState({ isEditable: false, initValue: formInitValue });

    useEffect(() => {
        buildBreadcrumb(breadcrumbs);
        dropdown.generalStatus();
        dropdown.fc();
    }, []);

    const tableRef = useRef(null);

    //bulk status update starts
    const bulkStatusUpdate = useCallback(async (selections, status) => {
        await setBulkStatus({
            data: {
                type: "Country",
                name: "id",
                value: selections.map(value => { return value.id }),
                status: status,
                updated_by: getLoginID()
            },
            dataTable: tableRef
        });
    }, []);
    //bulk status update end

    // add section start
    const setFormInitValue = useCallback(() => {
        setFormState({ initValue: formInitValue, isEditable: false });
        modalPopup.custom({ header: "Add Country", className: "sdm-popup", visible: true });
    }, []);
    // add section end

    // update section start
    const editItem = useCallback((ev, rowData) => {
        setFormState({
            initValue: {
                id: rowData.id,
                name: rowData.name,
                fc: Array.isArray(rowData.fc) ? rowData.fc.map(({ name, id }) => ({ label: name, value: id })) : [],
                status: rowData.status ? { label: rowData.status.name, value: rowData.status.id } : null
            },
            isEditable: true
        });
        modalPopup.custom({ header: "Update Country", className: "sdm-popup", visible: true });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id, name) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            toasterMessage: {
                success: "Country" + (name ? ` "${name}"` : "") + " has been removed successfully",
                error: "Unable to remove country" + (name ? ` "${name}"` : "")
            },
            dataTable: tableRef
        });
    }, []);
    // remove section start

    const service = useMemo(() => new Service(), []);

    const options = useMemo(() => ({
        tablePrimeConfig: {
            autoLayout: true,
            lazy: true,
        },

        url: service,

        method: "getCountryList",

        lazyParams: {
            sortField: "created_at",
            sortOrder: -1
        },

        columns: [
            {
                header: "Name",
                field: "name",
                sortable: true,
                filter: true,
                headerStyle: {
                    width: "150px"
                }
            },
            {
                header: "Finance Controller",
                field: "fc",
                sortable: true,
                filter: true,
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "fc"
                },
                headerStyle: {
                    width: "200px"
                },
                body: financeControllersBadge
            },
            {
                header: "Status",
                field: "status.name",
                sortable: true,
                sortField: "status",
                filter: true,
                filterField: "status",
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "generalStatus"
                },
                headerStyle: {
                    width: "100px"
                }
            },
            {
                header: "Created On",
                field: "created_at",
                sortable: true,
                filter: true,
                filterElementOptions: {
                    type: "Calendar",
                    primeFieldProps: {
                        maxDate: new Date()
                    }
                },
                headerStyle: {
                    width: "100px"
                },
                body: createdDateBadge
            }
        ],

        actionBtnOptions: [
            {
                onClick: editItem
            },
            {
                onClick: (ev, rowData) => {
                    confirmDialog.custom({
                        message: "Are you sure you want to delete this country? This may affect other screens",
                        accept: () => { removeItem(rowData.id, rowData.name) },
                        visible: true
                    });
                }
            }
        ],

        toolBarBtnOptions: {
            title: "Country List",
            selection: {
                field: {
                    options: "generalStatus"
                },
                updateBtnsOptions: {
                    onClick: ({ selections, status }) => {
                        confirmDialog.custom({
                            message: "You are about to mass update the status of countries?",
                            accept: () => { bulkStatusUpdate(selections, status) },
                            visible: true
                        });
                    }
                },
                enableDelete: false
            },
            rightBtnsOptions: [
                { onClick: setFormInitValue }
            ]
        },
        enableSelection: true
    }), []);

    return (
        <div>
            <HFNDataTable ref={tableRef} options={options} />
            <HFNModalPopup>
                <Form initialValue={formState} dataTableRef={tableRef} />
            </HFNModalPopup>
        </div>
    );
};

export default Country;
