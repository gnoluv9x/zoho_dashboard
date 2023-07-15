import React from "react";
import DatepickerCustom from "../Common/DatepickerCustom";
import "react-datepicker/dist/react-datepicker.css";
import SelectCustom from "../Common/SelectCustom";

interface FilterProps {}

const Filter: React.FC<FilterProps> = ({}) => {
  const handleChange = (value: string | null): void => {
    console.log("Debug_here value: ", value);
  };

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3">
        <div className="filter__startDate col-span-2">
          <h5 className="font-bold">Date started</h5>
          <div className="grid grid-cols-2 gap-3">
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày bắt đầu"
              isClearable
              onDateChange={handleChange}
            />
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày kết thúc"
              isClearable
              onDateChange={handleChange}
            />
          </div>
        </div>
        <div className="filter__createdDate col-span-2">
          <h5 className="font-bold">Date created</h5>
          <div className="grid grid-cols-2 gap-3">
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày bắt đầu"
              isClearable
              onDateChange={handleChange}
            />
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày kết thúc"
              isClearable
              onDateChange={handleChange}
            />
          </div>
        </div>
        <div className="filter__status">
          <h5 className="font-bold">Status</h5>
          <SelectCustom />
        </div>
        <div className="">a</div>
        <div className="">a</div>
        <div className="">a</div>
      </div>
    </div>
  );
};

export default Filter;
