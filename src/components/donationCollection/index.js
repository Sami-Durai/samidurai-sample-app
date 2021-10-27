import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/donationCollection/Form";

// shared components 
import HFNDataTable from "sharedComponents/datatable/HFNDataTable";

import HFNModalPopup from "sharedComponents/modalPopup";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import response from "utils/response";

import confirmDialog from "utils/confirmDialog";

import modalPopup from "utils/modalPopup";

import { boolBadge, createdDateBadge } from "utils/badgeTemplate";

// services 
import Service from "services/donationCollection/donationCollection.service";

// constants
const breadcrumbs = [
    { label: "Dashboard", url: "dashboard", icon: 'pi pi-home' },
    { label: "Donation Collection", url: "" }
];

const formInitValue = {};

// page component
const DonationCollection = () => {
    const [formState, setFormState] = useState({ isEditable: false, initValue: formInitValue });

    useEffect(() => {
        buildBreadcrumb(breadcrumbs);
    }, []);

    const tableRef = useRef(null);

    // add section start
    const setFormInitValue = useCallback(() => {
        setFormState({ initValue: formInitValue, isEditable: false });
        modalPopup.custom({ header: "Add Donation Collection", className: "sdm-popup", visible: true });
    }, []);
    // add section end

    // update section start
    const editItem = useCallback((ev, rowData) => {
        setFormState({
            initValue: {
                id: rowData.id,
                name: rowData.name,
                email: rowData.email,
                date: rowData.date,
                initiative_id: rowData.initiative_id,
                printReceipt: rowData.printReceipt,
                currency: rowData.currency,
                amount: rowData.amount,
                full_address: rowData.full_address,
                city_id: rowData.city_id,
                state_id: rowData.state_id,
                country_id: rowData.country_id,
                tax_id: rowData.tax_id,
                payment_type: rowData.payment_type,
                dcollector: rowData.dcollector,
                cash_given_to_am: rowData.cash_given_to_am,
                tax_id_type: rowData.tax_id_type,
                citizenship: rowData.citizenship,
                country_name: rowData.country_name,
                duser_id: rowData.duser_id,
                daccount_d: rowData.daccount_d,
                dorg_id: rowData.dorg_id,
            },
            isEditable: true
        });
        modalPopup.custom({ header: "Update Donation Collection", className: "sdm-popup", visible: true });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id, name) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            toasterMessage: {
                success: "DonationCollection" + (name ? ` "${name}"` : "") + " has been removed successfully",
                error: "Unable to remove donation collection" + (name ? ` "${name}"` : "")
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

        method: "getDonationCollectionList",

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
                header: "Print Receipt",
                field: "printReceipt",
                sortable: true,
                filter: true,
                headerStyle: {
                    minWidth: "150px"
                },
                body: boolBadge
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
                    minWidth: "100px"
                },
                body: createdDateBadge
            }
        ],

        actionBtnOptions: [
            {
                title: "Update donation collection",
                onClick: editItem
            },
            {
                title: "Delete donation collection",
                onClick: (ev, rowData) => {
                    confirmDialog.custom({
                        message: "Are you sure you want to delete this donation collection? This may affect other screens",
                        accept: () => { removeItem(rowData.id, rowData.name) },
                        visible: true
                    });
                }
            }
        ],

        toolBarBtnOptions: {
            title: "Donation Collection List",
            rightBtnsOptions: [
                { onClick: setFormInitValue }
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

export default DonationCollection;
