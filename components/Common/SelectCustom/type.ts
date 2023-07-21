import { Option } from "@/types/type";
import { Props as SelectProps, StylesConfig } from "react-select";

export type OptionTypes = Option<string | number>;

export interface SelectCustomProps extends SelectProps {
  className?: string;
  customStyles?: StylesConfig<any>;
  onChangeValue: (value: OptionTypes | OptionTypes[]) => void;
  options: Option<string | number>[];
}
