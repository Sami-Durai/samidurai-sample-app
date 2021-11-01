import React, { useEffect, useState } from "react";

// state
import { connect } from "react-redux";

// form
import { useForm, Controller } from "react-hook-form";

// components
import Select from "react-select";

import Async from 'react-select/async';

import PhoneInput from "react-phone-input-2";

//prime components
import { InputText } from "primereact/inputtext";

import { Password } from "primereact/password";

import { InputTextarea } from "primereact/inputtextarea";

import { Checkbox } from "primereact/checkbox";

import { InputSwitch } from "primereact/inputswitch";

import { Slider } from "primereact/slider";

import { Calendar } from "primereact/calendar";

import { Chips } from "primereact/chips";

import { AutoComplete } from "primereact/autocomplete";

import { Button } from "primereact/button";

// utils
import { isEmpty, isObject } from "lodash";

import { classNames } from "primereact/utils";

import modalPopup from "utils/modalPopup";

// service
//import DropdownService from "services/dropdown/dropdown.service";

// config
import config from "assets/config";

function HFNDynamicForm({ initialValues, fields, onFormSubmit, submitButtonGroup, formConfig, dd }) {

  const closeModel = (
    <div className="form-button-group">
      <Button type="button" className="p-button p-button-secondary p-mr-2" label="Cancel" onClick={() => { modalPopup.toggle(false) }} > </Button>
      <Button type="submit" label="Submit" className="p-button p-button-primary" />
    </div>
  )

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  // autocomplete sections 
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    Object.keys(initialValues).forEach(key => {
      setValue(key, initialValues[key], { shouldValidate: true, shouldDirty: true });
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = (data) => {
    onFormSubmit(data, errors);
  };


  const setAcItems = (searchField, searchValue, service, method) => {
    try {
      let payload = searchField ? { [searchField]: searchValue } : searchValue

      service[method](payload)
        .then((res) => {
          if (res && res.data)
            setFilteredItems(Array.isArray(res.data) ? res.data : res.data.data);
          else
            setFilteredItems([]);
        });
    }
    catch {
      setFilteredItems([]);
      console.log("Something went wrong.");
    }
  }

  const searchAcItems = (ev, searchField, service, method, type) => {

    let searchValue = ev.query;

    if (searchValue.length > 2) {
      setTimeout(() => {
        setAcItems(searchField, searchValue, service, method, type)
      }, 500);
    }

  }

  const loadACOptions = (inputValue, callback, service, method, labelField, valueField) => {
    try {
      if (inputValue.length > 2) {
        service[method](inputValue)
          .then((res) => {
            let acOptions = [];
            let results = [];

            if (res && res.data) {
              if (Array.isArray(res.data))
                results = res.data;
              else if (Array.isArray(res.data.data))
                results = res.data.data;
                
              acOptions = results.map(acOption => ({
                ...acOption,
                label: acOption[labelField],
                value: acOption[valueField]
              }));
            }
            callback(acOptions);
          });
      }
    }
    catch {
      callback([]);
      console.log("Something went wrong.");
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmitForm)}
      className={`form-wrapper ${formConfig ? formConfig.formClassName : ""}`}
      autoComplete={`${formConfig ? formConfig.autoComplete : "on"}`}
    >

      <div className={`p-fluid form-section p-d-flex p-flex-wrap ${formConfig ? formConfig.formSectionClassName : ""}`}>
        {
          Object.keys(fields).map((key, index) => {

            const { properties } = fields[key];

            let primeFieldProps, validations;

            if (properties.primeFieldProps) {
              primeFieldProps = properties.primeFieldProps;
            } else {
              primeFieldProps = {}
            }

            if (properties.validations) {
              validations = properties.validations;
            } else {
              validations = {}
            }

            return (

              (properties.visibility === false) ? <React.Fragment key={key}></React.Fragment> : <React.Fragment key={key}>

                <div className={`p-field-wrapper p-col-12 ${properties.fieldWrapperClassNames ? properties.fieldWrapperClassNames : ""}`} key={key + index}>

                  {
                    (["Checkbox"].indexOf(properties.type) === -1)
                      ?
                      <label htmlFor="lastname1" className={`p-field-label ${properties.fieldLabelClassNames ? properties.fieldLabelClassNames : ""}`}>
                        {
                          (validations && validations.required && validations.required.value) ? <em>*&nbsp;</em> : <></>
                        }
                        {properties.label}
                        {properties.tooltip ? <span className="tooltip-icon" title={properties.tooltip} > <i className="uil uil-info-circle"></i> </span> : <></>}
                      </label>
                      :
                      null
                  }

                  <div className={`p-field-section ${properties.fieldSectionClassNames ? properties.fieldSectionClassNames : ""}`}>
                    {(() => {

                      switch (properties.type) {

                        case "InputText":
                          return <InputText {...primeFieldProps} className={classNames({ "p-invalid": errors[key] })} name={key} {...register(key, validations)} />

                        case "Password":
                          return <Password {...primeFieldProps} className={classNames({ "p-invalid": errors[key] })} name={key} {...register(key, validations)} />

                        case "InputTextarea":
                          return <InputTextarea {...primeFieldProps} className={classNames({ "p-invalid": errors[key] })} name={key} {...register(key, validations)} />


                        case "Select":
                          return (<Controller control={control} rules={validations} name={key} defaultValue={null}
                            render={({ field: { onChange, value, name } }) => {
                              return <Select
                                className={classNames({ "p-invalid": errors[key] })}
                                noOptionsMessage={() => "No data found"}
                                {...primeFieldProps}
                                name={name}
                                value={value}
                                onChange={(value) => {
                                  onChange(value);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(value, setValue);
                                  }
                                }}
                                options={!isEmpty(properties.dropdownOptions) && Array.isArray(dd[properties.dropdownOptions]) ? dd[properties.dropdownOptions] : (primeFieldProps.options || [])}
                              />
                            }} />)

                        case "MultiSelect":
                          return (<Controller control={control} rules={validations} name={key} defaultValue={null}
                            render={({ field: { onChange, value, name } }) => {
                              return <Select
                                className={classNames({ "p-invalid": errors[key] })}
                                closeMenuOnSelect={false}
                                noOptionsMessage={() => "No data found"}
                                {...primeFieldProps}
                                name={name}
                                value={value}
                                isMulti={true}
                                onChange={(value) => {
                                  onChange(value);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(value, setValue);
                                  }
                                }}
                                options={!isEmpty(properties.dropdownOptions) && Array.isArray(dd[properties.dropdownOptions]) ? dd[properties.dropdownOptions] : (primeFieldProps.options || [])}
                              />
                            }} />)

                        case "Checkbox":
                          return (<div>
                            <Controller name={key} control={control} rules={validations} render={(props) => (
                              <Checkbox className={classNames({ "p-invalid": errors[key] })} {...primeFieldProps} inputId={key}
                                onChange={(e) => {
                                  props.field.onChange(e.checked);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(e, setValue);
                                  }
                                }}
                                checked={props.field.value} />
                            )} />

                            <label htmlFor={key} className={`p-pl-2 p-checkbox-label ${properties.fieldLabelClassNames ? properties.fieldLabelClassNames : ""}`}>
                              {
                                (validations && validations.required && validations.required.value) ? <em>*&nbsp;</em> : <></>
                              }
                              {properties.label}
                              {properties.tooltip ? <span className="tooltip-icon" title={properties.tooltip} > <i className="uil uil-info-circle"></i> </span> : <></>}
                            </label>

                          </div>)

                        case "RadioButton":

                          if (properties.items) {
                            return properties.items.map((item) => {
                              return (
                                <div key={item.key} className="p-field-radiobutton">
                                  <Controller className={classNames({ "p-invalid": errors[key] })} name={key} control={control} rules={validations} render={(props) => {
                                    return (
                                      <input type="radio" id={item.key} value={item.key} name={key} {...primeFieldProps}
                                        onClick={(e) => {
                                          props.field.onChange(e.target.value);
                                          if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                            primeFieldProps.onChange(e, setValue);
                                          }
                                        }}
                                      />
                                    )
                                  }} />
                                  <label htmlFor={item.key}>{item.name}</label>
                                </div>
                              )
                            })
                          }

                          break;

                        case "InputSwitch":
                          return (<div>
                            <Controller name={key} control={control} rules={validations} render={(props) => (
                              <InputSwitch {...primeFieldProps} inputId={key}
                                onChange={(e) => {
                                  props.field.onChange(e.value);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(e, setValue);
                                  }
                                }}
                                checked={props.field.value} />
                            )} />
                          </div>)

                        case "FileUpload":
                          if (!validations.validate) {
                            let maxAllowedFileSize = properties.maxFileSize || config.maxAllowedFileSize;
                            if (maxAllowedFileSize) {
                              let fileSizeError = properties.fileSizeError || `Selected file size is greater than allowed file size`;
                              validations.validate = value => {
                                return (!isEmpty(value) && value[0].size && value[0].size > (maxAllowedFileSize * 1024 * 1024)) ? fileSizeError : true;
                              }
                            }
                          }
                          return <InputText className={classNames({ "p-invalid": errors[key] })} type="file" {...primeFieldProps} name={key} {...register(key, validations)} />

                        case "Slider":
                          return <div>
                            <Slider {...primeFieldProps} onSlideEnd={(ev) => { setValue(key, ev.value) }} />
                            <InputText type="hidden" name={key} {...register(key, validations)} />
                          </div>

                        case "Calendar":
                          return (<Controller control={control} rules={validations} name={key} defaultValue={null}
                            render={(props) => {
                              return <Calendar className={classNames({ "p-invalid": errors[key] })} {...primeFieldProps} name={props.field.name} value={props.field.value}
                                onChange={(e) => {
                                  props.field.onChange(e.value);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(e, setValue);
                                  }
                                }}
                                optionLabel="label" optionValue="value"
                                inputRef={props.field.ref} />
                            }} />)

                        case "Chips":
                          return (<div>
                            <Controller name={key} control={control} rules={validations} render={(props) => (
                              <Chips className={classNames({ "p-invalid": errors[key] })}
                                onChange={(e) => {
                                  props.field.onChange(e.value);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(e, setValue);
                                  }
                                }}
                              />
                            )} />
                            <label htmlFor={key} className="p-checkbox-label">{properties.label}</label>
                          </div>)

                        case "PhoneInput":
                          return (<Controller control={control} rules={validations} name={key} defaultValue={null}
                            render={(props) => {
                              return <PhoneInput
                                className={classNames({ "p-invalid": errors[key] })}
                                country={"in"}
                                value={props.field.value}
                                name={props.field.name}
                                {...primeFieldProps}
                                onChange={(value, country, e, formattedValue) => {
                                  props.field.onChange(formattedValue);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(value, country, e, formattedValue, setValue);
                                  }
                                }}
                                inputRef={props.field.ref} />
                            }} />)

                        case "AutoComplete":
                          return (<Controller control={control} rules={validations} name={key} defaultValue={null}
                            render={({ field: { onChange, value, name } }) => {
                              return <Async
                                className={classNames({ "p-invalid": errors[key] })}
                                noOptionsMessage={() => "No data found"}
                                {...primeFieldProps}
                                name={name}
                                value={value}
                                autoComplete="off"
                                loadOptions={(inputValue, callback) => {
                                  loadACOptions(inputValue, callback, properties.service, properties.method, properties.optionLabel || "name", properties.optionValue || "id")
                                }}
                                onChange={(value) => {
                                  onChange(value);
                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(value, setValue);
                                  }
                                }}
                              />
                            }} />)

                        case "StateAutoComplete":
                          return (<Controller control={control} rules={validations} name={key} defaultValue={null}
                            render={(props) => {
                              return <AutoComplete
                                className={classNames({ "p-invalid": errors[key] })}
                                {...primeFieldProps}
                                autoComplete="off"
                                name={props.field.name}
                                value={props.field.value}
                                suggestions={filteredItems}
                                completeMethod={(ev) => {
                                  searchAcItems(ev, properties.searchField, properties.service, properties.method, "cac")
                                }}
                                onChange={(e) => {

                                  if (isObject(e.value)) {
                                    props.field.onChange(e.value[properties.fieldLabel]);
                                  } else {
                                    props.field.onChange(e.value);
                                  }

                                  if (primeFieldProps && primeFieldProps.onChange && typeof primeFieldProps.onChange === "function") {
                                    primeFieldProps.onChange(e, setValue);
                                  }
                                }}
                                field={properties.fieldLabel}
                                inputRef={props.field.ref} />
                            }} />)

                        default:
                          return <>Form field not available</>

                      }
                    })()}
                  </div>

                  <div className={`p-error-section ${properties.fieldErrorClassNames ? properties.fieldErrorClassNames : ""}`}>
                    {errors[key] && (<span role="alert" className="error"> {errors[key].message} </span>)}
                  </div>

                  {
                    properties.hint
                      ?
                      <div className={`p-hint-section ${properties.fieldHintClassNames ? properties.fieldHintClassNames : ""}`}>
                        {properties.hint}
                      </div>
                      :
                      <></>
                  }

                </div>

              </React.Fragment>

            )

          })
        }

      </div>

      {(submitButtonGroup && typeof submitButtonGroup === "function") ? submitButtonGroup() : closeModel}

    </form>
  )
}

const mapStateToProps = (state) => ({
  dd: state.dropdownDetails,
});

export default connect(mapStateToProps)(HFNDynamicForm);