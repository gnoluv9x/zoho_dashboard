import { Option } from "@/types/type";

const MultiValueContainer = ({ selectProps, data }: any) => {
  const label = data.label;
  const allSelected: Option<string | number>[] = selectProps.value;
  const index = allSelected.findIndex((selected) => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  const val = `${label}${isLastSelected ? "" : ", "}`;
  return val;
};

export default MultiValueContainer;
