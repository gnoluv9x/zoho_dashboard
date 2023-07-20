import React from "react";
import DatepickerCustom from "../Common/DatepickerCustom";
import "react-datepicker/dist/react-datepicker.css";
import SelectCustom from "../Common/SelectCustom";
import { Option } from "@/types/type";

const MOCK_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

interface FilterProps {
  loading: boolean;
  data: any;
}

const Filter: React.FC<FilterProps> = ({ loading, data }) => {
  const handleChange = (value: string | null): void => {
    console.log("Debug_here value: ", value);
  };

  const handleChangeSelectValue = (value: Option<string | number>["value"]) => {
    console.log("Debug_here value: ", value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3">
      <div className="filter__startDate col-span-2">
        <h5 className="font-bold">Date started</h5>
        <div className="grid grid-cols-2 gap-3">
          <DatepickerCustom initialValue={null} placeholder="Ngày bắt đầu" isClearable onDateChange={handleChange} />
          <DatepickerCustom initialValue={null} placeholder="Ngày kết thúc" isClearable onDateChange={handleChange} />
        </div>
      </div>
      <div className="filter__createdDate col-span-2">
        <h5 className="font-bold">Date created</h5>
        <div className="grid grid-cols-2 gap-3">
          <DatepickerCustom initialValue={null} placeholder="Ngày bắt đầu" isClearable onDateChange={handleChange} />
          <DatepickerCustom initialValue={null} placeholder="Ngày kết thúc" isClearable onDateChange={handleChange} />
        </div>
      </div>
      <div className="filter__status">
        <h5 className="font-bold">Status</h5>
        <SelectCustom onChangeValue={handleChangeSelectValue} options={MOCK_OPTIONS} />
      </div>
      <div className="filter__assignedTo">
        <h5 className="font-bold">Assigned to</h5>
        <SelectCustom onChangeValue={handleChangeSelectValue} options={MOCK_OPTIONS} />
      </div>
      <div className="filter__projects">
        <h5 className="font-bold">Projects</h5>
        <SelectCustom onChangeValue={handleChangeSelectValue} options={MOCK_OPTIONS} />
      </div>
      <div className="filter__btnSubmit flex items-end">
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md">Search</button>
      </div>
    </div>
  );
};

export default Filter;
