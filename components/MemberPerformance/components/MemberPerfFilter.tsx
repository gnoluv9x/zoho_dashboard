"use client";

import DatepickerCustom from "@/components/common/DatePicker";
import { Button } from "@/components/ui/button";
import { FORMATS_OF_DATE } from "@/types/type";
import React, { useState } from "react";

interface MemberPerfFilterProps {
  filters: Record<"monthYear", string>;
  onChangeFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const MemberPerfFilter: React.FC<MemberPerfFilterProps> = ({ filters, onChangeFilters }) => {
  const [dateValue, setDateValue] = useState<string>(filters.monthYear);

  const handleChangeMonth = (value: any) => {
    setDateValue(value);
  };

  const handleSubmitSearch = () => {
    onChangeFilters((prevFilters) => ({ ...prevFilters, monthYear: dateValue }));
  };

  return (
    <div className="grid grid-cols-12 gap-x-2">
      <div className="filter_month col-span-12 md:col-span-8 lg:col-span-2">
        <h5 className="font-bold">Tháng</h5>
        <DatepickerCustom
          placeholder="Lọc theo tháng"
          value={dateValue}
          dateFormat={FORMATS_OF_DATE.ONLY_MONTH_YEAR}
          isClearable
          onDateChange={handleChangeMonth}
          showMonthYearPicker
          showFullMonthYearPicker
          className="w-full"
        />
      </div>
      <div className="col-span-12 mt-2 flex items-end justify-start gap-x-2 md:col-span-4 md:mt-0 md:justify-end lg:col-span-2 xl:justify-start">
        <div className="filter__btnSubmit">
          <Button onClick={handleSubmitSearch}>Xem</Button>
        </div>
      </div>
    </div>
  );
};
