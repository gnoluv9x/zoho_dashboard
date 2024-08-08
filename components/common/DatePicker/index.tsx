import { DatePickerStyled } from "@/components/common/DatePicker/styled";
import { FORMATS_OF_DATE } from "@/types/type";
import { formatDateToString, getDateValue } from "@/utils/helper";
import React from "react";
import { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";

interface CustomDatepickerProps
  extends Omit<DatePickerProps, "onChange" | "dateFormat" | "minDate" | "maxDate" | "value"> {
  dateFormat?: FORMATS_OF_DATE;
  placeholder?: string;
  onDateChange: (value: string | null) => void;
  minDate?: string | null;
  maxDate?: string | null;
  value: string | null;
  [key: string]: any;
}

const DatepickerCustom: React.FC<CustomDatepickerProps> = ({
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
      className={twMerge("h-[38px] w-full rounded-md border-[1px] border-[#cccccc] px-2", className)}
      onChange={handleChangeDate}
      minDate={minDate ? getDateValue(minDate, dateFormat) : undefined}
      maxDate={maxDate ? getDateValue(maxDate, dateFormat) : undefined}
      {...props}
    />
  );
};

export default DatepickerCustom;