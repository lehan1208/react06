import React from "react";

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
