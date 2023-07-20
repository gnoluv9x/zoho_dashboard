export enum CookieKey {
  ACCESS_TOKEN = "accessToken",
}

export type StringOrNumber = string | number;

export type Option<T> = {
  value: T;
  label: string;
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
};
