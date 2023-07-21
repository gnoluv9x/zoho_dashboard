import React, { useState } from "react";
import DatepickerCustom from "../Common/DatePicker";
import SelectCustom from "../Common/SelectCustom";
import { Option, TaskDetail } from "@/types/type";
import { CommonInfo, IdAndNameType } from "@/types";
import { OptionTypes } from "../Common/SelectCustom/type";

interface FilterProps {
  loading: boolean;
  listStatus: CommonInfo[];
  listProjects: CommonInfo[];
  listMembers: IdAndNameType[];
  allItems: TaskDetail[];
  onChangeRenderItems: React.Dispatch<React.SetStateAction<TaskDetail[]>>;
}

type FiltersType = {
  startedDateRange: { start: string; end: string };
  createdDateRange: { start: string; end: string };
  status: string;
  members: string[];
  project: string;
};

const Filter: React.FC<FilterProps> = ({ listMembers, listProjects, listStatus, allItems, onChangeRenderItems }) => {
  const [filters, setFilters] = useState<FiltersType>({
    startedDateRange: { start: "", end: "" },
    createdDateRange: { start: "", end: "" },
    status: "",
    members: [],
    project: "",
  });

  const handleChangeDate = (
    value: string | null,
    type: "startedDateRange" | "createdDateRange",
    field: "start" | "end",
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: { ...prevFilters[type], [field]: value },
    }));
  };

  const handleChangeSelectValue = (value: OptionTypes | OptionTypes[], field: "status" | "members" | "project") => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleClearFilter = () => {
    onChangeRenderItems(allItems);
  };

  const handleSubmitSearch = () => {
    console.log("Debug_here filters: ", filters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-2">
      <div className="filter__startDate col-span-2">
        <h5 className="font-bold">Date started</h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày bắt đầu"
              isClearable
              onDateChange={(value) => handleChangeDate(value, "startedDateRange", "start")}
              maxDate={filters.startedDateRange.end}
            />
          </div>
          <div>
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày kết thúc"
              isClearable
              onDateChange={(value) => handleChangeDate(value, "startedDateRange", "end")}
              minDate={filters.startedDateRange.start}
            />
          </div>
        </div>
      </div>
      <div className="filter__createdDate col-span-2">
        <h5 className="font-bold">Date created</h5>
        <div className="grid grid-cols-2 gap-3">
          <div className="">
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày bắt đầu"
              isClearable
              onDateChange={(value) => handleChangeDate(value, "createdDateRange", "start")}
              maxDate={filters.createdDateRange.end}
            />
          </div>
          <div className="">
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày kết thúc"
              isClearable
              onDateChange={(value) => handleChangeDate(value, "createdDateRange", "end")}
              minDate={filters.createdDateRange.start}
            />
          </div>
        </div>
      </div>
      <div className="filter__status">
        <h5 className="font-bold">Status</h5>
        <SelectCustom
          onChangeValue={(value: OptionTypes | OptionTypes[]) => handleChangeSelectValue(value, "status")}
          options={listStatus.map(({ id, name }) => ({ value: id, label: name }))}
        />
      </div>
      <div className="filter__assignedTo">
        <h5 className="font-bold">Assigned to</h5>
        <SelectCustom
          onChangeValue={(value: OptionTypes | OptionTypes[]) => handleChangeSelectValue(value, "members")}
          options={listMembers.map(({ id, name }) => ({ value: id, label: name }))}
          isMulti
          closeMenuOnSelect={false}
        />
      </div>
      <div className="filter__projects">
        <h5 className="font-bold">Projects</h5>
        <SelectCustom
          onChangeValue={(value: OptionTypes | OptionTypes[]) => handleChangeSelectValue(value, "project")}
          options={listProjects.map(({ id, name }) => ({ value: id, label: name }))}
        />
      </div>
      <div className="actions flex justify-center items-end gap-x-2">
        <div className="filter__btnSubmit">
          <button onClick={handleSubmitSearch} className="px-4 py-[6px] text-white bg-blue-600 rounded-md">
            Search
          </button>
        </div>
        <div className="filter__btnSubmit">
          <button onClick={handleClearFilter} className="px-4 py-[6px] text-white bg-slate-300 rounded-md">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
