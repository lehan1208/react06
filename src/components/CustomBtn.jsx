import React from 'react';

function CustomBtn(props) {
  const { color, className, onClick, type ,...others} = props;

  //   () => navigate('/major')
  const buttonClass = `btn btn-${color} ${className}`;
  return (
    <>
      <button className={buttonClass} onClick={onClick} type={type ? type : 'button'}>
        {props.children}
      </button>
    </>
  );
}

export default CustomBtn;
