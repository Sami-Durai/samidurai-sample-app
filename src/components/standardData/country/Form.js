import React, { useRef, useMemo, useCallback } from "react";

// components
// shared components
import HFNDynamicForm from "sharedComponents/hfnForm";

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

  const service = useMemo(() => new CountryService(), []);

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
    fc: {
      properties: {
        type: "MultiSelect",
        label: "Finance Controller",
        primeFieldProps: {
        },
        validations: {
          required: validations.required,
        },
        dropdownOptions: "fc"
      }
    },
    status: {
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
  }), []);

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
  }, []);

  // add new and update section start
  const addUpdateCountry = useCallback(async (data) => {
    if (!isEditable)
      await response.add({
        service: service,
        method: "addCountry",
        data: { item: data },
        toasterMessage: {
          success: `Country "${data.name}" has been created successfully`,
          error: `Unable to create country ${data.name}`
        },
        dataTable: dataTableRef
      });
    else
      await response.update({
        service: service,
        method: "updateCountry",
        data: { itemId: initValue.id, item: data },
        toasterMessage: {
          success: `Country "${data.name}" has been updated successfully`,
          error: `Unable to update country ${data.name}`
        },
        dataTable: dataTableRef
      });
  }, []);
  // add new and update section end
  // form submit section end

  return (
    <HFNDynamicForm initialValues={initValue.current} fields={formFields} onFormSubmit={formOnsubmit} />
  );
}

export default Form;
