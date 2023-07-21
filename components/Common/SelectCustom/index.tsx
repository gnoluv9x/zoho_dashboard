import React from "react";
import ReactSelect from "react-select";
import { OptionTypes, SelectCustomProps } from "./type";

const defaultStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: "36px",
    height: "36px",
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
  ...props
}) => {
  const handleChangeValue = (values: OptionTypes | OptionTypes[]) => {
    onChangeValue(values);
  };

  return (
    <ReactSelect
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSearchable={isSearchable}
      name={name}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      className="select-custom-container"
      classNamePrefix="select-custom"
      onChange={handleChangeValue}
      {...props}
    />
  );
};

export default SelectCustom;
