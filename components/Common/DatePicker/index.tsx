import { formatDateToString, getDateValue } from "@/utils/helper";
import React, { useState } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { DatePickerStyled } from "./styled";
import "react-datepicker/dist/react-datepicker.css";
import { FORMATS_OF_DATE } from "@/types/type";
import { twMerge } from "tailwind-merge";

interface DatepickerProps
  extends Omit<ReactDatePickerProps, "onChange" | "dateFormat" | "minDate" | "maxDate" | "value"> {
  dateFormat?: FORMATS_OF_DATE;
  placeholder?: string;
  onDateChange: (value: string | null) => void;
  minDate?: string | null;
  maxDate?: string | null;
  value: string | null;
  [key: string]: any;
}

const DatepickerCustom: React.FC<DatepickerProps> = ({
  dateFormat = FORMATS_OF_DATE["DEFAULT"],
  placeholder = "Vui lòng chọn ngày",
  onDateChange,
  minDate,
  maxDate,
  value,
  className,
  ...props
}) => {
  const handleChangeDate = (date: Date | null) => {
    const dateVal = formatDateToString(date, dateFormat);
    onDateChange(dateVal);
  };

  return (
    <DatePickerStyled
      selected={value ? getDateValue(value, dateFormat) : undefined}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      className={twMerge("border-[1px] border-[#cccccc] px-2 rounded-md w-full h-[38px]", className)}
      onChange={handleChangeDate}
      minDate={minDate ? getDateValue(minDate, dateFormat) : null}
      maxDate={maxDate ? getDateValue(maxDate, dateFormat) : null}
      {...props}
    />
  );
};

export default DatepickerCustom;
