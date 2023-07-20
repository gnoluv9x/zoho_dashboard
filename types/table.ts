import { CellContext, HeaderContext } from "@tanstack/react-table";
import React from "react";

type StringOrCallback = string | (() => string);

export type TableColumnCutom<T> = {
  fieldName: keyof T;
  heading: StringOrCallback;
  align?: "left" | "right" | "center";
  footer?: StringOrCallback;
  customCell?: (info: CellContext<T, any>) => string | React.ReactNode | unknown;
};
