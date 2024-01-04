import React from "react";

const CustomInput = (props) => {
  const { type, label, i_class, i_id,name,val ,onBl,onCh} = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onCh}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
