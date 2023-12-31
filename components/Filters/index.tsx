import { useAppContext } from "@/app/context/App";
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from "@/constant";
import { FORMATS_OF_DATE, Option, TaskDetail } from "@/types/type";
import { getDateValue, sortFollowDate } from "@/utils/helper";
import React, { useState } from "react";
import DatepickerCustom from "../Common/DatePicker";
import SelectCustom from "../Common/SelectCustom";
import { OptionTypes } from "../Common/SelectCustom/type";

interface FilterProps {
  allItems: TaskDetail[];
}

type FiltersType = {
  startedDateRange: { start: string; end: string };
  createdDateRange: { start: string; end: string };
  status: Option<string> | null;
  members: Option<string>[];
  project: Option<string> | null;
};

export const defaultFilters: FiltersType = {
  startedDateRange: { start: "", end: "" },
  createdDateRange: { start: "", end: "" },
  status: null,
  members: [],
  project: null,
};

const Filter: React.FC<FilterProps> = ({ allItems }) => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  const appContext = useAppContext();

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
    setFilters(defaultFilters);
    appContext?.setRenderItems(allItems);
  };

  const handleSubmitSearch = () => {
    const listMemberIds = filters.members.map((memb) => memb.value);

    const startedDateStartTime = filters.startedDateRange.start
      ? getDateValue(filters.startedDateRange.start, FORMATS_OF_DATE["DEFAULT"])
      : new Date(DEFAULT_START_TIME);
    const startedDateEndTime = filters.startedDateRange.end
      ? getDateValue(filters.startedDateRange.end, FORMATS_OF_DATE["DEFAULT"])
      : new Date(DEFAULT_END_TIME);
    const createdDateStartTime = filters.createdDateRange.start
      ? getDateValue(filters.createdDateRange.start, FORMATS_OF_DATE["DEFAULT"])
      : new Date(DEFAULT_START_TIME);
    const createdDateEndTime = filters.createdDateRange.end
      ? getDateValue(filters.createdDateRange.end, FORMATS_OF_DATE["DEFAULT"])
      : new Date(DEFAULT_END_TIME);

    const filteredItems = allItems.filter((taskItem: TaskDetail) => {
      const startedDate = taskItem.timeStart ? new Date(taskItem.timeStart) : "";
      const createdDate = taskItem.timeCreate ? new Date(taskItem.timeCreate) : "";

      // check status
      if (filters.status?.value && taskItem.statusTask !== filters.status.value) {
        return false;
      }

      // check project
      if (filters.project?.value && taskItem.idProject !== filters.project.value) {
        return false;
      }

      // check started date
      if (startedDate && (startedDate < startedDateStartTime || startedDate > startedDateEndTime)) {
        return false;
      }

      // check created date
      if (createdDate && (createdDate < createdDateStartTime || createdDate > createdDateEndTime)) {
        return false;
      }

      // check members
      if (listMemberIds.length !== 0) {
        const userWork = taskItem.userWork.filter((userId) => listMemberIds.includes(userId));
        if (userWork.length === 0) return false;
      }

      return true;
    });

    // sort list follow created time
    sortFollowDate(filteredItems, "timeCreate", "desc");

    appContext?.setRenderItems(filteredItems);
  };

  return (
    <div className="grid grid-cols-12 gap-x-2">
      <div className="filter__startDate col-span-12 md:col-span-6 lg:col-span-4">
        <h5 className="font-bold">Date started</h5>
        <div className="grid grid-cols-2 gap-3 h-[36px]">
          <div>
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày bắt đầu"
              value={filters.startedDateRange.start}
              isClearable
              onDateChange={(value) => handleChangeDate(value, "startedDateRange", "start")}
              maxDate={filters.startedDateRange.end}
            />
          </div>
          <div>
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày kết thúc"
              value={filters.startedDateRange.end}
              isClearable
              onDateChange={(value) => handleChangeDate(value, "startedDateRange", "end")}
              minDate={filters.startedDateRange.start}
            />
          </div>
        </div>
      </div>
      <div className="filter__createdDate col-span-12 md:col-span-6 lg:col-span-4">
        <h5 className="font-bold">Date created</h5>
        <div className="grid grid-cols-2 gap-3">
          <div className="">
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày bắt đầu"
              isClearable
              value={filters.createdDateRange.start}
              onDateChange={(value) => handleChangeDate(value, "createdDateRange", "start")}
              maxDate={filters.createdDateRange.end}
            />
          </div>
          <div className="">
            <DatepickerCustom
              initialValue={null}
              placeholder="Ngày kết thúc"
              value={filters.createdDateRange.end}
              isClearable
              onDateChange={(value) => handleChangeDate(value, "createdDateRange", "end")}
              minDate={filters.createdDateRange.start}
            />
          </div>
        </div>
      </div>
      <div className="filter__status col-span-12 md:col-span-6 lg:col-span-2">
        <h5 className="font-bold">Status</h5>
        <SelectCustom
          value={filters.status}
          onChangeValue={(value: OptionTypes | OptionTypes[]) => handleChangeSelectValue(value, "status")}
          options={
            appContext?.listStatus ? appContext?.listStatus.map(({ id, name }) => ({ value: id, label: name })) : []
          }
        />
      </div>
      <div className="filter__projects col-span-12 md:col-span-6 lg:col-span-2">
        <h5 className="font-bold">Projects</h5>
        <SelectCustom
          value={filters.project}
          onChangeValue={(value: OptionTypes | OptionTypes[]) => handleChangeSelectValue(value, "project")}
          options={
            appContext?.listProjects ? appContext?.listProjects.map(({ id, name }) => ({ value: id, label: name })) : []
          }
        />
      </div>
      <div className="filter__assignedTo col-span-12 md:col-span-8 lg:col-span-4">
        <h5 className="font-bold">Assigned to</h5>
        <SelectCustom
          value={filters.members}
          onChangeValue={(value: OptionTypes | OptionTypes[]) => handleChangeSelectValue(value, "members")}
          options={
            appContext?.listMembers ? appContext?.listMembers.map(({ id, name }) => ({ value: id, label: name })) : []
          }
          isMulti
          closeMenuOnSelect={false}
        />
      </div>
      <div className="mt-2 md:mt-0 flex justify-start md:justify-end xl:justify-start items-end gap-x-2 col-span-12 md:col-span-4 lg:col-span-2">
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
