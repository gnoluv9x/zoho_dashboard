import { APP_PRECISION, ITEM_PROPS_NAME, SPRINT_START_DATE } from "@/constant";
import { ListMonthsFollowProjectId, SprintDataType, SprintsInProjectType } from "@/types";
import { FORMATS_OF_DATE, TaskDetail } from "@/types/type";
import classNames from "classnames";
import dayjs from "dayjs";
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

  const result = Object.keys(itemProps).reduce(
    (acc, apiKey) => {
      const responseName = ITEM_PROPS_NAME[apiKey];

      if (responseName) {
        acc[responseName as keyof TaskDetail] = itemProps[apiKey];
      }

      return acc;
    },
    {} as Record<Partial<keyof TaskDetail>, number>,
  );

  return result;
}

export function getMonthFromSprintName(sprintName: string): string {
  const pattern = /\((?:[A-Za-z])?(\d+)[-/_](\d+)\)/;

  const match = sprintName.match(pattern);

  if (match) {
    const [, month, year] = match;
    let newMonth = parseInt(month, 10);

    // Đảm bảo month trong khoảng 1-12
    newMonth = ((newMonth - 1) % 12) + 1;

    const fullYear = year.length === 2 ? "20" + year : year;

    return `${newMonth.toString().padStart(2, "0")}/${fullYear}`;
  }

  return "";
}

// hàm kiểm tra xem task có nằm trong sprint có bộ lọc theo tháng không? Sprint này sẽ có tên format dạng: Sprint 20 (T08/2024)
export function checkTaskItemInSprintWithMonth(
  listSprints: SprintDataType[],
  taskItem: TaskDetail,
  filterMonth: string,
): boolean {
  const listSprintsHasMonth = listSprints.reduce<string[]>((result, sprint) => {
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

  return Math.round(totalHours * APP_PRECISION) / APP_PRECISION;
}

/*
 * Hàm này để fix lỗi 0.1 + 0.2 = 0.300000000000004 (Floating point error)
 */
export function fixCalculateFloatingPointError(
  listNumbers: number[],
  operation: "plus" | "minus" = "plus",
  precision = APP_PRECISION,
) {
  let total = 0;

  if (operation === "plus") {
    total = listNumbers.reduce((result, numb) => (result += numb * precision), 0);
  } else {
    const initValue = Math.round(listNumbers[0] * precision);
    total = listNumbers.reduce((result, numb, idx) => {
      if (idx !== 0) {
        result -= Math.round(numb * precision);
      }

      return result;
    }, initValue);
  }

  return total / precision;
}

/**
 * Hàm này nhận vào tên sprint: Sprint 23 (T1_24) và trả ra số sprint: 23
 */
export function getCurrentSprintFromName(name: string): number {
  const regex = /\b(\d+)\s*(?:\(|\b)/;
  const match = name.trim().match(regex);

  if (match) {
    return parseInt(match[1]);
  }

  return 0;
}

/**
 * Hàm này nhận vào tên task: [38][FE] Cập nhật trang bán hàng => trả về 38 (sprint của task)
 */
export function getSprintNameInTaskName(taskName: string): number {
  const match = taskName.trim().match(/^\[(\d+)\]/);

  return match ? parseInt(match[1]) : 0;
}

/**
 *
 * @param listSprints SprintDataType[]
 * @returns { "projectId" : { "month" : []}}
 */
export function getListProjectWithMonth(listSprints: SprintDataType[]): ListMonthsFollowProjectId {
  if (listSprints.length === 0) return {};

  return listSprints.reduce<ListMonthsFollowProjectId>((lists, spr) => {
    if (spr.month) {
      const currentMonth = spr.month;
      const currentProjectId = spr.projectId;
      const projectData = lists[currentProjectId];
      const sprintNumber = getCurrentSprintFromName(spr.name);

      if (projectData) {
        const currentMonthData = projectData[currentMonth];

        if (currentMonthData) {
          const currentSprintData = { id: spr.id, name: spr.name, month: currentMonth, sprintNumber };
          currentMonthData.push(currentSprintData);
        } else {
          const listSprints: SprintsInProjectType = [{ id: spr.id, month: currentMonth, sprintNumber, name: spr.name }];

          projectData[currentMonth] = listSprints;
        }
      } else {
        const currentSprintDataInMonth: Record<string, SprintsInProjectType> = {
          [currentMonth]: [{ id: spr.id, sprintNumber, month: currentMonth, name: spr.name }],
        }; // { "08/2024": []}

        lists[currentProjectId] = currentSprintDataInMonth;
      }
    }

    return lists;
  }, {});
}

export function checkAuth(username: string, password: string): boolean {
  if (!username || !password) return false;

  const listUsernames = getListsFromName(process.env.NEXT_PUBLIC_ZOHO_USERNAME);
  const listPasswords = getListsFromName(process.env.NEXT_PUBLIC_ZOHO_PASSWORD);

  if (listUsernames.length === 0 || listPasswords.length === 0) return false;

  return listUsernames.includes(username) && listPasswords.includes(password);
}

function getListsFromName(nameString: string | undefined): string[] {
  if (!nameString) return [];

  return nameString.includes(",") ? nameString.split(",") : [nameString];
}

// hàm này lấy index của tên sprint trong list sprint
export function getIdxSprintName(sprintProps: Record<string, number>) {
  if (!sprintProps || Object.keys(sprintProps).length === 0) return 0;

  return sprintProps.sprintName || 0;
}

// hàm này lấy index của ngày tạo sprint
export function getIdxSprintCreatedAt(sprintProps: Record<string, number>) {
  if (!sprintProps || Object.keys(sprintProps).length === 0) return 7;

  return sprintProps.createdTime || 7;
}

export function isValidSprint(creatdTime: string) {
  // những sprint được tạo từ ngày 01/08/2024 là những sprint được áp dụng KPI và có format dạng: Sprint 20 (T8_24)
  return dayjs(creatdTime).isAfter(dayjs(SPRINT_START_DATE, "DD-MM-YYYY"));
}
