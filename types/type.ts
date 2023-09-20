import { CommonInfo, IdAndNameType, ItemTypes } from ".";

export enum CookieKey {
  ACCESS_TOKEN = "accessToken",
}

export type StringOrNumber = string | number;

export type Option<T> = {
  value: T;
  label: T | string;
};

export type TaskDetail = {
  idTask: string;
  idProject: string;
  name: string;
  taskDetail: string;
  idTaskNumber: string;
  estimate: string;
  timeStart: string;
  timeEnd: string;
  estimatePoint: string;
  timeCreate: string;
  sprintId: string;
  statusTask: string;
  priorityId: string;
  userWork: string[];
  itemTypeid: string;
  itemTypeTitle: string;
};

export enum FORMATS_OF_DATE {
  DEFAULT = "dd/MM/yyyy",
  MONTH_FIRST = "MM/dd/yyyy",
  YEAR_FIRST = "yyyy/MM/dd",
}

export type AppContextType = {
  renderItems: TaskDetail[];
  setRenderItems: (currentItems: TaskDetail[]) => void;
  listSprints: any[];
  setListSprints: (listSprints: any[]) => void;
  listStatus: CommonInfo[];
  setListStatus: (listStatus: CommonInfo[]) => void;
  listMembers: IdAndNameType[];
  setListMembers: (listMembers: IdAndNameType[]) => void;
  listProjects: CommonInfo[];
  setListProjects: (listProjects: CommonInfo[]) => void;
  listItemTypes: ItemTypes[];
  setListItemTypes: (listItemTypes: ItemTypes[]) => void;
};
