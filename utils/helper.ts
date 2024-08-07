import { ITEM_PROPS_NAME } from "@/constant";
import { SprintDataType } from "@/types";
import { FORMATS_OF_DATE, TaskDetail } from "@/types/type";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const handleLogout = async () => {};

export const removeDuplicate = (list: any[], uniqueField: string) => {
  return [...(new Map(list.map((item) => [item[uniqueField], item])).values() as any)];
};

export const getFibonancyFromIndex = (index: number): number => {
  if (index < 2) return index;
  let prev = 0;
  let current = 1;

  for (let i = 2; i <= index + 1; i++) {
    const temp = current;
    current = prev + current;
    prev = temp;
  }

  return current;
};

export const formatDateValue = (val: number): string => {
  return ("0" + val).slice(-2);
};

export const convertIsoStringDateToFormated = (dateString: string) => {
  if (!dateString) return "-";

  const dateFormat = new Date(dateString);

  const year = dateFormat.getFullYear().toString();
  const month = formatDateValue(dateFormat.getMonth() + 1);
  const date = formatDateValue(dateFormat.getDate());
  const hours = formatDateValue(dateFormat.getHours());
  const minutes = formatDateValue(dateFormat.getMinutes());
  const seconds = dateFormat.getSeconds().toString();

  return hours + ":" + minutes + ":" + seconds + " " + date + "-" + month + "-" + year;
};

export const getDateValue = (dateString: string, formated: FORMATS_OF_DATE): Date => {
  const separator = dateString.includes("/") ? "/" : "-";

  const datesArray = dateString.split(separator);
  const formatDateArray = formated.split(separator);

  const dateIndex = formatDateArray.indexOf("dd");
  const monthIndex = formatDateArray.indexOf("MM");
  const yearIndex = formatDateArray.indexOf("yyyy");

  let year = yearIndex !== -1 ? parseInt(datesArray[yearIndex]) : new Date().getFullYear();
  let month = monthIndex !== -1 ? parseInt(datesArray[monthIndex]) - 1 : 0;
  let day = dateIndex !== -1 ? parseInt(datesArray[dateIndex]) : 1;

  // Nếu chỉ có tháng và năm (MM/yyyy), đặt ngày là 1
  if (formatDateArray.length === 2 && monthIndex !== -1 && yearIndex !== -1) {
    day = 1;
  }

  const result = new Date(year, month, day);

  return result;
};

export function formatDateToString(value: Date | null, dateFormat: FORMATS_OF_DATE): string {
  if (!value) return "";

  const day = value.getDate().toString().padStart(2, "0");
  const month = (value.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = value.getFullYear().toString();

  return dateFormat.replace("dd", day).replace("MM", month).replace("yyyy", year);
}

export const sortFollowDate = (lists: any[], fieldSort: string, order: "asc" | "desc"): void => {
  if (order === "asc") {
    lists.sort((a, b) => new Date(a[fieldSort]).getTime() - new Date(b[fieldSort]).getTime());
  } else {
    lists.sort((a, b) => new Date(b[fieldSort]).getTime() - new Date(a[fieldSort]).getTime());
  }
};

export function cn(...inputs: classNames.ArgumentArray) {
  return twMerge(classNames(inputs));
}

export function getItemProps(itemProps: Record<string, number>): Record<Partial<keyof TaskDetail>, number> | {} {
  if (!itemProps || Object.keys(itemProps).length === 0) return {};

  const result = Object.keys(itemProps).reduce((acc, apiKey) => {
    const responseName = ITEM_PROPS_NAME[apiKey];

    if (responseName) {
      acc[responseName as keyof TaskDetail] = itemProps[apiKey];
    }

    return acc;
  }, {} as Record<Partial<keyof TaskDetail>, number>);

  return result;
}

export function getMonthFromSprintName(sprintName: string): string {
  const pattern = /\(([A-Za-z])(\d+)_(\d+)\)/;

  const match = sprintName.match(pattern);

  if (match) {
    const [, , month, year] = match;
    const fullYear = year.length === 2 ? "20" + year : year;
    return `${month.padStart(2, "0")}/${fullYear}`;
  }

  return "";
}

// hàm kiểm tra xem task có nằm trong sprint có bộ lọc theo tháng không? Sprint này sẽ có tên format dạng: Sprint 20 (T08/2024)
export function checkTaskItemInSprintWithMonth(
  list: SprintDataType[],
  taskItem: TaskDetail,
  filterMonth: string,
): boolean {
  const listSprintsHasMonth = list.reduce<string[]>((result, sprint) => {
    if (sprint.month && filterMonth === sprint.month) {
      result.push(sprint.id);
    }

    return result;
  }, []);

  return listSprintsHasMonth?.includes(taskItem.sprintId);
}

// hàm này convert ngày giờ phút sang số giờ, ví dụ: 1d2h => 18h
export function convertTimeToHours(timeString: string): number {
  const regex = /(\d+d)?\s*(\d+h)?\s*(\d+m)?/;
  const match = timeString.trim().match(regex);

  if (!match) return 0;

  const days = parseInt(match[1]) || 0;
  const hours = parseInt(match[2]) || 0;
  const minutes = parseInt(match[3]) || 0;

  const totalHours = days * 8 + hours + minutes / 60;

  return Math.round(totalHours * 100) / 100;
}
