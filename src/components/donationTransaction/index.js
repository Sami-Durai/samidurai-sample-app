import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/donationTransaction/Form";

// shared components 
import HFNDataTable from "sharedComponents/datatable/HFNDataTable";

import HFNModalPopup from "sharedComponents/modalPopup";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import response from "utils/response";

import confirmDialog from "utils/confirmDialog";

import modalPopup from "utils/modalPopup";

import { createdDateBadge } from "utils/badgeTemplate";

// services 
import Service from "services/donationTransaction/donationTransaction.service";

// constants
const breadcrumbs = [
    { label: "Dashboard", url: "dashboard", icon: 'pi pi-home' },
    { label: "Donation Transaction", url: "" }
];

const formInitValue = {};

// page component
const DonationTransaction = () => {
    const [formState, setFormState] = useState({ isEditable: false, initValue: formInitValue });

    useEffect(() => {
        buildBreadcrumb(breadcrumbs);
    }, []);

    const tableRef = useRef(null);

    // update section start
    const editItem = useCallback((ev, rowData) => {
        setFormState({
            initValue: {
                id: rowData.id,
                name: rowData.name,
                email: rowData.email,
                date: rowData.date,
                currency: rowData.currency,
                amount: rowData.amount,
                full_address: rowData.full_address,
                city_id: rowData.city_id,
                state_id: rowData.state_id,
                country_id: rowData.country_id,
                tax_id: rowData.tax_id,
                tax_id_type: rowData.tax_id_type,
                citizenship: rowData.citizenship,
                country_name: rowData.country_name,
                duser_id: rowData.duser_id,
                daccount_d: rowData.daccount_d,
                dorg_id: rowData.dorg_id,
                web_payment_gate_way: rowData.web_payment_gate_way,
                web_transaction_id: rowData.web_transaction_id,
                web_transaction_date: rowData.web_transaction_date,
                web_transaction_details: rowData.web_transaction_details
            },
            isEditable: true
        });
        modalPopup.custom({ header: "Update Donation Transaction", className: "sdm-popup", visible: true });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id, name) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            toasterMessage: {
                success: "Donation transaction" + (name ? ` "${name}"` : "") + " has been removed successfully",
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

        method: "getDonationTransactionList",

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
                header: "Currency",
                field: "currency",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Amount",
                field: "amount",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Country",
                field: "country_name",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                }
            },
            {
                header: "Transaction Date",
                field: "date",
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
                title: "Update donation transaction",
                onClick: editItem
            },
            {
                title: "Delete donation transaction",
                onClick: (ev, rowData) => {
                    confirmDialog.custom({
                        message: "Are you sure you want to delete this donation transaction? This may affect other screens",
                        accept: () => { removeItem(rowData.id, rowData.name) },
                        visible: true
                    });
                }
            }
        ],

        toolBarBtnOptions: {
            title: "Donation Transaction List",
            rightBtnsOptions: [
                { visibility: false }
            ]
        }
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

export default DonationTransaction;
