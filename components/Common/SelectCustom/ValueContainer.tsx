import { MIN_SELECTED_VALUES } from "@/constant";
import { Option } from "@/types/type";
import { ValueContainerProps, components } from "react-select";

const ValueContainer = ({ children, ...props }: ValueContainerProps<Option<string | number>>) => {
  let [values, input] = children as any;

  if (Array.isArray(values) && values.length > MIN_SELECTED_VALUES) {
    const firstItems = values.slice(0, MIN_SELECTED_VALUES);
    const respItems = values.slice(MIN_SELECTED_VALUES);
    values = [
      ...firstItems,
      <span key="responsive_item" className="">
        +{respItems.length}...
      </span>,
    ];
  }

  return (
    <components.ValueContainer {...props}>
      {values}
      {input}
    </components.ValueContainer>
  );
};

export default ValueContainer;
