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
import Service from "services/standardData/donationAccount.service";

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
    dorg: {
      properties: {
        type: "Select",
        label: "Organization",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        },
        dropdownOptions: "organization"
      }
    },
    payment_gateway: {
      properties: {
        type: "InputText",
        label: "Payment Gateway",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        }
      }
    },
    contact_email: {
      properties: {
        type: "InputText",
        label: "Contact Email",
        primeFieldProps: {
        },
        validations: {
          pattern: validations.email,
          required: validations.required
        }
      }
    },
    account_type: {
      properties: {
        type: "Select",
        label: "Account Type",
        primeFieldProps: {
        },
        validations: {
          required: validations.required
        },
        dropdownOptions: "accountType"
      }
    },
    status: {
      properties: {
        type: "Select",
        label: "Status",
        primeFieldProps: {
        },
        validations: {
          required: validations.required,
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
        method: "addDonationAccount",
        data: { item: data },
        toasterMessage: {
          success: `Donation account "${data.name}" has been created successfully`,
          error: `Unable to create donation account ${data.name}`
        },
        dataTable: dataTableRef
      });
    else
      await response.update({
        service: service,
        method: "updateDonationAccount",
        data: { itemId: initValue.id, item: data },
        toasterMessage: {
          success: `Donation account "${data.name}" has been updated successfully`,
          error: `Unable to update donation account ${data.name}`
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
