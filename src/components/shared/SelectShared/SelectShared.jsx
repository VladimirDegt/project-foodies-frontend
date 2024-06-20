import Select from "react-select";
import React from "react";
import customStyles from "./customStyles";

const SelectShared = React.forwardRef(
  ({ options, placeholder, className, onChange, value }, ref) => (
    <Select
      ref={ref}
      options={options.map((option) => ({ value: option._id, label: option.name }))}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      value={value}
      styles={customStyles}
    />
  )
);

SelectShared.displayName = "SelectShared";
export default SelectShared;
