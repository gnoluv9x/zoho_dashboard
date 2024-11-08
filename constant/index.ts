import { FiltersType } from "@/types/type";
import dayjs from "dayjs";

export const ACCEPT_STATUS_CODE = { UNAUTH: 401, INVALID_FORMAT: 403, BAD_REQUEST: 400 };

export const ACCESS_TOKEN_COOKIE_KEY = "accessToken";
export const USERNAME_COOKIE_KEY = "user";

export const INVALID_TOKEN_CODE = 7601;

export const SPRINT_START_DATE = "01-08-2024"; // Ngày bắt đầu tính performance cho member (dùng để giới hạn số lần call api)

export const REVALIDATE_TIME_ZERO = 0; // seconds
export const REVALIDATE_TIME_ONE_MONTH = 30 * 24 * 60 * 60; // 1 month
export const REVALIDATE_TIME_ONE_DAY = 24 * 60 * 60; // 1 day
export const REVALIDATE_TIME_ONE_HOUR = 60 * 60; // 1h

export const DEFAULT_PAGE = 1;

export const PAGE_SIZE_OPTIONS = [10, 20, 30];

export const ALIGN_VALUE = { left: "flex-start", right: "flex-end", center: "center" };

export const DEFAULT_START_TIME = "2020-01-01";

export const DEFAULT_END_TIME = "2050-01-01";

export const MIN_SELECTED_VALUES = 3;

export const APP_PRECISION = 100; // Số này để làm tròn trong app

// Danh sách tên thuộc tính lấy từ ZOHO_API của task và tên thuộc tính của Response tương ứng
export const ITEM_PROPS_NAME: Record<string, string> = {
  endDate: "timeEnd",
  releaseCount: "",
  description: "taskDetail",
  isNotesAdded: "",
  itemNo: "idTaskNumber",
  ownerId: "userWork",
  addedVia: "",
  hasCheckList: "",
  leftPosition: "",
  duration: "durationTime",
  itemEpicSeq: "",
  itemName: "name",
  startAfter: "",
  descriptionBlockId: "",
  createdTime: "timeCreate",
  isIntegrated: "",
  rightPosition: "",
  rootItem: "",
  isDocsAdded: "",
  projPriorityId: "",
  isParent: "",
  userGroupCount: "",
  completedDate: "",
  sequence: "",
  sprintId: "sprintId",
  depth: "",
  points: "estimatePoint",
  itemStatusSeq: "",
  statusId: "statusTask",
  epicId: "",
  createdBy: "",
  parentItem: "",
  tagCount: "",
  projItemTypeId: "itemTypeId",
  startDate: "timeStart",
  completedBy: "",
};

export const defaultFilters: FiltersType = {
  startedDateRange: { start: "", end: "" },
  createdDateRange: { start: "", end: "" },
  status: null,
  members: [],
  project: null,
  monthYear: dayjs().format("MM/YYYY"),
};
