import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/financeController/Form";

// shared components 
import HFNDataTable from "sharedComponents/datatable/HFNDataTable";

import HFNModalPopup from "sharedComponents/modalPopup";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import response from "utils/response";

import confirmDialog from "utils/confirmDialog";

import modalPopup from "utils/modalPopup";

import { createdDateBadge } from "utils/badgeTemplate";

import { setBulkStatus } from "utils/bulk";

import { getLoginID } from "utils/login";

import dropdown from "utils/dropdown";

// services 
import Service from "services/financeController/financeController.service";

// constants
const breadcrumbs = [
    { label: "Dashboard", url: "dashboard", icon: 'pi pi-home' },
    { label: "Finance Controller", url: "" }
];

const formInitValue = {};

// page component
const FinanceController = () => {
    const [formState, setFormState] = useState({ isEditable: false, initValue: formInitValue });

    useEffect(() => {
        buildBreadcrumb(breadcrumbs);
        dropdown.generalStatus();
        dropdown.country();
    }, []);

    const tableRef = useRef(null);

    //bulk status update starts
    const bulkStatusUpdate = useCallback(async (selections, status) => {
        await setBulkStatus({
            data: {
                type: "FinanceController",
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
        modalPopup.custom({ header: "Add Finance Controller", className: "sdm-popup", visible: true });
    }, []);
    // add section end

    // update section start
    const editItem = useCallback((ev, rowData) => {
        setFormState({
            initValue: {
                id: rowData.id,
                name: rowData.name,
                srcmId: rowData.srcmId,
                srcmRef: rowData.srcmRef,
                email: rowData.email,
                mobile: rowData.mobile,
                fc_roles: rowData.fc_roles ? { label: rowData.fc_roles.name, value: rowData.fc_roles.id } : null,
                status: rowData.status ? { label: rowData.status.name, value: rowData.status.id } : null
            },
            isEditable: true
        });
        modalPopup.custom({ header: "Update Finance Controller", className: "sdm-popup", visible: true });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id, name) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            toasterMessage: {
                success: "Finance controller" + (name ? ` "${name}"` : "") + " has been removed successfully",
                error: "Unable to remove payment Account" + (name ? ` "${name}"` : "")
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

        method: "getFinanceControllerList",

        lazyParams: {
            sortField: "created_at",
            sortOrder: -1
        },

        columns: [
            {
                header: "Abhyasi ID",
                field: "abhyasi_id",
                sortable: true,
                headerStyle: {
                    minWidth: "120px"
                }
            },
            {
                header: "Name",
                field: "name",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Email",
                field: "email",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                },
                transformValue: false
            },
            {
                header: "Mobile No",
                field: "mobile",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                },
                transformValue: false
            },
            {
                header: "Country",
                field: "fc_roles.name",
                sortable: true,
                sortField: "fc_roles",
                filter: true,
                filterField: "fc_roles",
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "country"
                },
                headerStyle: {
                    minWidth: "100px"
                }
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
                    minWidth: "100px"
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
                        maxDate: new Date(),
                        selectionMode: "range"
                    }
                },
                headerStyle: {
                    minWidth: "100px"
                },
                body: createdDateBadge
            }
        ],

        actionBtnOptions: [
            {
                title: "Update finance controller",
                onClick: editItem
            },
            {
                title: "Delete finance controller",
                onClick: (ev, rowData) => {
                    confirmDialog.custom({
                        message: "Are you sure you want to delete this finance controller? This may affect other screens",
                        accept: () => { removeItem(rowData.id, rowData.name) },
                        visible: true
                    });
                }
            }
        ],

        toolBarBtnOptions: {
            title: "Finance Controller List",
            selection: {
                field: {
                    options: "generalStatus"
                },
                updateBtnsOptions: {
                    onClick: ({ selections, status }) => {
                        confirmDialog.custom({
                            message: "You are about to mass update the status of finance controllers?",
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

export default FinanceController;
