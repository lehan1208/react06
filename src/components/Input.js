import React from "react";
import propTypes from "prop-types";
import Validator from "./../helpers/propTypeValidator";
function Input(props) {
  const {
    type = "text",
    inputRef,
    id,
    label,
    labelSize = 3,
    inputSize,
    required = false,
    lastRow = false,
    formField,
    errMessage,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize} col-form-label ${
    required ? "required" : ""
  }`;
  const inputClass = `form-control ${errMessage ? "is-invalid" : ""}`;

  return (
    <div className={`row ${lastRow ? "" : "mb-3"}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className={`col-sm-${inputSize ? inputSize : ""}`}>
        {others["rows"] > 1 ? (
          <textarea
            ref={inputRef}
            id={id}
            {...others}
            {...formField}
            className={inputClass}
          ></textarea>
        ) : (
          <input
            type={type}
            ref={inputRef}
            id={id}
            {...others}
            {...formField}
            className={inputClass}
          />
        )}
        {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
}

export default Input;

Input.prototype = {
  inputRef: propTypes.object,
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  labelSize: Validator.numberBetween(1, 12),
  lastRow: propTypes.bool,
  formField: propTypes.object,
  errorMsg: propTypes.string,
};
