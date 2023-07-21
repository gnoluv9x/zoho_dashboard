import { formatDateToString, getDateValue } from "@/utils/helper";
import React, { useState } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { DatePickerStyled } from "./styled";
import "react-datepicker/dist/react-datepicker.css";
import { FORMATS_OF_DATE } from "@/types/type";

interface DatepickerProps extends Omit<ReactDatePickerProps, "onChange" | "dateFormat" | "minDate" | "maxDate"> {
  dateFormat?: FORMATS_OF_DATE;
  placeholder?: string;
  initialValue?: Date | null;
  onDateChange: (value: string | null) => void;
  minDate?: string | null;
  maxDate?: string | null;
  [key: string]: any;
}

const DatepickerCustom: React.FC<DatepickerProps> = ({
  dateFormat = FORMATS_OF_DATE["DEFAULT"],
  placeholder = "Vui lòng chọn ngày",
  initialValue,
  onDateChange,
  minDate,
  maxDate,
  ...props
}) => {
  const [dateVal, setDateVal] = useState<Date | null>(initialValue || null);

  const handleChangeDate = (date: Date | null) => {
    setDateVal(date);
    const dateVal = formatDateToString(date, dateFormat);
    onDateChange(dateVal);
  };

  return (
    <DatePickerStyled
      selected={dateVal}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      className="border-2 px-2 py-1 rounded-md w-full"
      onChange={handleChangeDate}
      minDate={minDate ? getDateValue(minDate, dateFormat) : null}
      maxDate={maxDate ? getDateValue(maxDate, dateFormat) : null}
      {...props}
    />
  );
};

export default DatepickerCustom;
