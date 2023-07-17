import { Option } from "@/types/type";
import React from "react";
import ReactSelect, { Props as SelectProps, StylesConfig } from "react-select";
import { SelectStyled } from "./styled";

interface SelectCustomProps extends SelectProps {
  className?: string;
  customStyles?: StylesConfig<any>;
  onChangeValue: (value: Option<string | number>["value"]) => void;
  options: Option<string | number>[];
}

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
      onChange={(option: any) => onChangeValue(option.value)}
      {...props}
    />
  );
};

export default SelectCustom;
