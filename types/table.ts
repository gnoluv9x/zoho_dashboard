import { CellContext } from "@tanstack/react-table";
import React from "react";

type StringOrCallback = string | (() => string);

export type TableColumnCustom<T> = {
  fieldName: keyof T;
  heading: StringOrCallback;
  align?: "left" | "right" | "center";
  footer?: StringOrCallback;
  customCell?: (info: CellContext<T, any>) => string | React.ReactNode | unknown;
};
