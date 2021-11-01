import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/standardData/organization/Form";

// shared components 
import HFNDataTable from "sharedComponents/datatable/HFNDataTable";

import HFNModalPopup from "sharedComponents/modalPopup";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import response from "utils/response";

import confirmDialog from "utils/confirmDialog";

import modalPopup from "utils/modalPopup";

import { boolBadge, createdDateBadge } from "utils/badgeTemplate";

import { setBulkStatus } from "utils/bulk";

import { getLoginID } from "utils/login";

import dropdown from "utils/dropdown";

// services 
import Service from "services/standardData/organization.service";

// constants
const breadcrumbs = [
    { label: "Dashboard", url: "dashboard", icon: 'pi pi-home' },
    { label: "Organization", url: "" }
];

const formInitValue = {};

// page component
const Organization = () => {
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
                type: "Organization",
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
        modalPopup.custom({ header: "Add Organization", className: "sdm-popup", visible: true });
    }, []);
    // add section end

    // update section start
    const editItem = useCallback((ev, rowData) => {
        setFormState({
            initValue: {
                id: rowData.id,
                name: rowData.name,
                dcountry: rowData.dcountry ? { label: rowData.dcountry.name, value: rowData.dcountry.id } : null,
                legal_name: rowData.legal_name,
                business_address: rowData.business_address,
                pan: rowData.pan,
                tan: rowData.tan,
                gst: rowData.gst,
                certified80g: rowData.certified80g,
                status: rowData.status ? { label: rowData.status.name, value: rowData.status.id } : null
            },
            isEditable: true
        });
        modalPopup.custom({ header: "Update Organization", className: "sdm-popup", visible: true });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id, name) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            toasterMessage: {
                success: "Organization" + (name ? ` "${name}"` : "") + " has been removed successfully",
                error: "Unable to remove organization" + (name ? ` "${name}"` : "")
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

        method: "getOrganizationList",

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
                    minWidth: "150px"
                }
            },
            {
                header: "Country",
                field: "dcountry.name",
                sortable: true,
                sortField: "dcountry",
                filter: true,
                filterField: "dcountry",
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "country"
                },
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Legal Name",
                field: "legal_name",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "PAN",
                field: "pan",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "100px"
                }
            },
            {
                header: "TAN",
                field: "tan",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "10px"
                }
            },
            {
                header: "GST",
                field: "gst",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "100px"
                }
            },
            {
                header: "Certified 80G",
                field: "certified80g",
                sortable: true,
                headerStyle: {
                    minWidth: "100px"
                },
                body: boolBadge
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
                title: "Update organization",
                onClick: editItem
            },
            {
                title: "Delete organization",
                visibility: false,
                onClick: (ev, rowData) => {
                    confirmDialog.custom({
                        message: "Are you sure you want to delete this organization? This may affect other screens",
                        accept: () => { removeItem(rowData.id, rowData.name) },
                        visible: true
                    });
                }
            }
        ],

        toolBarBtnOptions: {
            title: "Donation Organization List",
            selection: {
                field: {
                    options: "generalStatus"
                },
                updateBtnsOptions: {
                    onClick: ({ selections, status }) => {
                        confirmDialog.custom({
                            message: "You are about to mass update the status of organizations?",
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

export default Organization;
