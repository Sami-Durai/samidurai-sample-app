import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/standardData/donationAccount/Form";

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
import Service from "services/standardData/donationAccount.service";

// constants
const breadcrumbs = [
    { label: "Dashboard", url: "dashboard", icon: 'pi pi-home' },
    { label: "Donation Account", url: "" }
];

const formInitValue = {};

// page component
const DonationAccount = () => {
    const [formState, setFormState] = useState({ isEditable: false, initValue: formInitValue });

    useEffect(() => {
        buildBreadcrumb(breadcrumbs);
        dropdown.generalStatus();
        dropdown.organization();
        dropdown.accountType();
    }, []);

    const tableRef = useRef(null);

    //bulk status update starts
    const bulkStatusUpdate = useCallback(async (selections, status) => {
        await setBulkStatus({
            data: {
                type: "DonationAccount",
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
        modalPopup.custom({ header: "Add Donation Account", className: "sdm-popup", visible: true });
    }, []);
    // add section end

    // update section start
    const editItem = useCallback((ev, rowData) => {
        setFormState({
            initValue: {
                id: rowData.id,
                name: rowData.name,
                dorg: rowData.dorg ? { label: rowData.dorg.name, value: rowData.dorg.id } : null,
                payment_gateway: rowData.payment_gateway,
                contact_email: rowData.contact_email,
                account_type: rowData.account_type ? { label: rowData.account_type, value: rowData.account_type } : null,
                status: rowData.status ? { label: rowData.status.name, value: rowData.status.id } : null
            },
            isEditable: true
        });
        modalPopup.custom({ header: "Update Donation Account", className: "sdm-popup", visible: true });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id, name) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            toasterMessage: {
                success: "Donation account" + (name ? ` "${name}"` : "") + " has been removed successfully",
                error: "Unable to remove donation account" + (name ? ` "${name}"` : "")
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

        method: "getDonationAccountList",

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
                header: "Organization",
                field: "dorg.name",
                sortable: true,
                sortField: "dorg",
                filter: true,
                filterField: "dorg",
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "organization"
                },
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Payment Gateway",
                field: "payment_gateway",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Contact Email",
                field: "contact_email",
                sortable: true,
                filter: true,
                headerStyle: {
                    width: "150px"
                },
                transformValue: false
            },
            {
                header: "Account Type",
                field: "account_type",
                sortable: true,
                filter: true,
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "accountType"
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
                title: "Update donation account",
                onClick: editItem
            },
            {
                title: "Delete donation account",
                onClick: (ev, rowData) => {
                    confirmDialog.custom({
                        message: "Are you sure you want to delete this donation account? This may affect other screens",
                        accept: () => { removeItem(rowData.id, rowData.name) },
                        visible: true
                    });
                }
            }
        ],

        toolBarBtnOptions: {
            title: "Donation Account List",
            selection: {
                field: {
                    options: "generalStatus"
                },
                updateBtnsOptions: {
                    onClick: ({ selections, status }) => {
                        confirmDialog.custom({
                            message: "You are about to mass update the status of donation accounts?",
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

export default DonationAccount;
