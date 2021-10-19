import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// components
import Form from "components/standardData/country/CountryForm";

// shared components 
import HFNDataTable from "shared-components/datatable/HFNDataTable";

import HFNModalPopup from "shared-components/modalPopup";

// utils 
import buildBreadcrumb from "utils/breadcrumb";

import response from "utils/response";

import confirmDialog from "utils/confirmDialog";

import modalPopup from "utils/modalPopup";

import { statusBadge, createdDateBadge } from "utils/badgeTemplate";

import { setBulkStatus } from "utils/bulk";

import { getLoginID } from "utils/login";

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
    }, []);

    const tableRef = useRef(null);

    const service = useRef(new Service());

    //bulk status update starts
    const bulkStatusUpdate = useCallback(async (selections, status_id) => {
        await setBulkStatus({
            data: {
                type: "Country",
                name: "id",
                value: selections.map(value => { return value.id }),
                status_id: status_id,
                updated_by: getLoginID()
            },
            dataTable: tableRef
        });
    }, []);
    //bulk status update end

    // add section start
    const setFormInitValue = useCallback(() => {
        setFormState({ initValue: formInitValue, isEditable: false });
        modalPopup.toggle(true);
        modalPopup.custom({ header: "Add Country", className: "sdm-popup" });
    }, []);
    // add section end

    // update section start
    const editItem = useCallback((ev, rowdata) => {
        setFormState({
            initValue: {
                id: rowdata.id,
                name: rowdata.name,
                status_id: rowdata.status_id,
            },
            isEditable: true
        });
        modalPopup.toggle(true)
        modalPopup.custom({ header: "Update Country", className: "sdm-popup" });
    }, []);
    // update section start

    // remove section start
    const removeItem = useCallback(async (id) => {
        await response.remove({
            service: service,
            method: "removeItem",
            data: { itemId: id },
            dataTable: tableRef
        });
    }, []);
    // remove section start

    const options = useMemo(() =>({
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
            },
            {
                header: "Status",
                field: "status_id",
                sortable: true,
                filter: true,
                body: statusBadge,
                filterType: "select",
                filterElementOptions: {
                    type: "Dropdown",
                    value: "generalStatus"
                }
            },
            {
                header: "Created On",
                field: "created_at",
                sortable: true,
                filter: true,
                body: createdDateBadge,
                filterElementOptions: {
                    type: "Calendar",
                    primeFieldProps: {
                        maxDate: new Date()
                    }
                }
            }
        ],

        actionBtnOptions: [
            {
                onClick: editItem
            },
            {
                onClick: (ev, rowdata) => {
                    confirmDialog.toggle(true);

                    confirmDialog.custom({
                        message: "Are you sure you want to delete this country? This may affect other screens",
                        accept: () => { removeItem(rowdata.id) }
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
                        confirmDialog.toggle(true);
                        confirmDialog.custom({
                            message: "You are about to mass update the status of countries?",
                            accept: () => { bulkStatusUpdate(selections, status) }
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
