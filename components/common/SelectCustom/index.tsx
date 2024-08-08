import React from "react";
import ReactSelect from "react-select";
import ValueContainer from "./ValueContainer";
import { OptionTypes, SelectCustomProps } from "./type";

const defaultStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: "36px",
    height: "auto",
  }),
};

const SelectCustom: React.FC<SelectCustomProps> = ({
  isLoading,
  isDisabled,
  isSearchable = true,
  placeholder = "Vui lòng chọn",
  name = "select",
  customStyles = defaultStyles,
  options,
  onChangeValue,
  value,
  ...props
}) => {
  const handleChangeValue = (values: unknown) => {
    onChangeValue(values as OptionTypes | OptionTypes[]);
  };

  return (
    <ReactSelect
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSearchable={isSearchable}
      name={name}
      value={value}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      className="select-custom-container"
      classNamePrefix="select-custom"
      onChange={handleChangeValue}
      components={{ ValueContainer }}
      {...props}
    />
  );
};

export default SelectCustom;
