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
import Service from "services/standardData/ashram.service";

// form component
const Form = ({ initialValue: { initValue: propInitValue, isEditable }, dataTableRef }) => {
  const initValue = useRef(propInitValue);

  const service = useMemo(() => new Service(), []);

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
    dcountry: {
      properties: {
        type: "Select",
        label: "Country",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        },
        dropdownOptions: "country"
      }
    },
    status: {
      properties: {
        type: "Select",
        label: "Status",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        },
        dropdownOptions: "generalStatus"
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
      addUpdateItem(formData);
    }
  }, []);

  // add new and update section start
  const addUpdateItem = useCallback(async (data) => {
    if (!isEditable)
      await response.add({
        service: service,
        method: "addAshram",
        data: { item: data },
        toasterMessage: {
          success: `Ashram "${data.name}" has been created successfully`,
          error: `Unable to create ashram ${data.name}`
        },
        dataTable: dataTableRef
      });
    else
      await response.update({
        service: service,
        method: "updateAshram",
        data: { itemId: initValue.id, item: data },
        toasterMessage: {
          success: `Ashram "${data.name}" has been updated successfully`,
          error: `Unable to update ashram ${data.name}`
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
