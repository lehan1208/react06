import React from "react";
import  propTypes  from 'prop-types';

function CustomBtn(props) {
  const {
    color,
    icon,
    className,
    onClick,
    type,
    isLoading,
    iconColor,
    ...others
  } = props;
  const spinnerClass = `spinner-border spinner-border-sm text-${iconColor} me-2`;
  const iconClass = `${icon} text-${iconColor} me-2`;

  const buttonClass = `btn btn-${color}`;
  return (
    <>
      <button
        className={buttonClass}
        onClick={onClick}
        type={type ? type : "button"}
        {...others}
      >
        {isLoading ? (
          <span className={spinnerClass}></span>
        ) : (
          <span className={iconClass}></span>
        )}
        {props.children}
      </button>
    </>
  );
}

export default CustomBtn;

CustomBtn.propTypes = {
  color: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func,
  type: propTypes.string,
  children: propTypes.node,
  isLoading: propTypes.bool,
  iconColor: propTypes.string,
};

CustomBtn.defaultProps = {
  color: "primary",
  className: "",
  onClick: () => {},
  type: "button",
  children: null,
  isLoading: false,
  iconColor: "white",
};
