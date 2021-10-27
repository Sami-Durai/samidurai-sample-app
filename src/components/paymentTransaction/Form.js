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
import Service from "services/paymentTransaction/paymentTransaction.service";

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
    email: {
      properties: {
        type: "InputText",
        label: "Email",
        primeFieldProps: {
        },
        validations: {
          pattern: validations.email,
          required: validations.required
        }
      }
    },
    mobile: {
      properties: {
        type: "InputText",
        label: "Mobile No",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        }
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
        method: "addPaymentTransaction",
        data: { item: data },
        toasterMessage: {
          success: `Payment Transaction "${data.name}" has been created successfully`,
          error: `Unable to create payment Account ${data.name}`
        },
        dataTable: dataTableRef
      });
    else
      await response.update({
        service: service,
        method: "updatePaymentTransaction",
        data: { itemId: initValue.id, item: data },
        toasterMessage: {
          success: `Payment Transaction "${data.name}" has been updated successfully`,
          error: `Unable to update payment Account ${data.name}`
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
