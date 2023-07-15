import { DEFAULT_DATE_FORMAT } from "@/constant";
import { formatVnDate } from "@/utils/helper";
import React, { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

interface DatepickerProps extends Omit<ReactDatePickerProps, "onChange" | "dateFormat"> {
  dateFormat?: string;
  placeholder?: string;
  initialValue?: Date | null;
  onDateChange: (value: string | null) => void;
  [key: string]: any;
}

const DatepickerCustom: React.FC<DatepickerProps> = ({
  dateFormat = DEFAULT_DATE_FORMAT,
  placeholder = "Vui lòng chọn ngày",
  initialValue,
  onDateChange,
  ...props
}) => {
  const [dateVal, setDateVal] = useState<Date | null>(initialValue || null);
  const [what, setWhat] = useState("");

  const handleChangeDate = (date: Date | null) => {
    setDateVal(date);
    const dateVal = formatVnDate(date);
    onDateChange(dateVal);
  };

  return (
    <DatePicker
      selected={dateVal}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      className="border-2 px-2 py-1 rounded-md w-full"
      onChange={handleChangeDate}
      {...props}
    />
  );
};

export default DatepickerCustom;
