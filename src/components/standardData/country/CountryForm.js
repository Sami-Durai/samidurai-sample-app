import React, { useRef, useMemo, useCallback } from "react";

// components
// shared components
import HFNDynamicForm from "shared-components/hfn-form";

// utils
import { isEmpty } from "lodash";

import validations from "utils/validations";

import response from "utils/response";

import { getLoginID } from "utils/login";

// services
import CountryService from "services/standardData/country.service";

// form component
const Form = ({ initialValue: { initValue: propInitValue, isEditable }, dataTableRef }) => {
  const initValue = useRef(propInitValue);

  const service = useRef(new CountryService());

  const formFields = useMemo(() => ({
    name: {
      properties: {
        type: "InputText",
        label: "Name",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        }
      }
    },
    status_id: {
      properties: {
        type: "Select",
        label: "Status",
        primeFieldProps: {
          options: [
            {
              label: "Active",
              value: 1
            },
            {
              label: "In Active",
              value: 2
            }
          ]
        },
        validations: {
          required: validations.required,
        }
      }
    }
  }));

  // form submit section start
  const formOnsubmit = useCallback((data, error) => {
    if (isEmpty(error)) {
      let formData = { ...initValue, ...data };
      if (!isEditable)
        formData.created_by = getLoginID();
      else
        formData.updated_by = getLoginID();
      addUpdateCountry(formData);
    }
  });

  // add new and update section start
  const addUpdateCountry = useCallback(async (data) => {
    if (!isEditable)
      await response.add({
        service: service,
        method: "addCountry",
        data: { item: data },
        dataTable: dataTableRef
      });
    else
      await response.update({
        service: service,
        method: "updateCountry",
        data: { itemId: initValue.id, item: data },
        dataTable: dataTableRef
      });
  });
  // add new and update section end
  // form submit section end

  return (
    <HFNDynamicForm initialValues={initValue} fields={formFields} onFormSubmit={formOnsubmit} />
  );
}

export default Form;
