import React from "react";
import propTypes from "prop-types";
import Validator from './../helpers/propTypeValidator';
function Input(props) {
  const {
    inputRef,
    id,
    label,
    labelSize,
    lastRow,
    formField,
    errorMsg,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;

  const inputClass = `form-control ${errorMsg ? "is-invalid" : ""}`;

  return (
    <div className={`row ${props.lastRow ? "" : "mb-3"}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="col-sm">
        <input
          ref={inputRef}
          className={inputClass}
          id={id}
          {...formField}
          {...others}
        />
        {errorMsg ? <div className="invalid-feedback">{errorMsg}</div> : ""}
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
