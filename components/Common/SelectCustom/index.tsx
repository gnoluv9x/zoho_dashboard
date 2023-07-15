import React from "react";
import { Props as SelectProps, StylesConfig } from "react-select";
import { SelectStyled } from "./styled";

interface SelectCustomProps extends SelectProps {
  className?: string;
  customStyles?: StylesConfig<any>;
}

const defaultStyles = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    height: "24px",
  }),
};

const SelectCustom: React.FC<SelectCustomProps> = ({
  isLoading,
  isDisabled,
  isSearchable = true,
  placeholder = "Vui lòng chọn",
  name = "select",
  customStyles = defaultStyles,
  ...props
}) => {
  const colourOptions: any[] = [
    { label: "A", value: "a" },
    { label: "B", value: "b" },
  ];

  return (
    <SelectStyled
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSearchable={isSearchable}
      name={name}
      options={colourOptions}
      placeholder={placeholder}
      styles={customStyles}
      className="select-custom-container"
      classNamePrefix="select-custom"
      {...props}
    />
  );
};

export default SelectCustom;
