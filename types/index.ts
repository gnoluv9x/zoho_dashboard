export interface ILoginBody {
  username: string;
  password: string;
}

export enum ACCEPT_HTTP_STATUS_CODE {
  SUCCESS = 200,
  UNAUTH = 401,
  INVALID_FORMAT = 403,
  BAD_REQUEST = 400,
}

export type CommonInfo = {
  id: string;
  name: string;
  createdAt: string;
};

export type ItemType = {
  id: string;
  title: string;
};

export type ItemTypes = {
  id: string;
  data: ItemType[];
};

export type IdAndNameType = Omit<CommonInfo, "createdAt">;
export type SprintDataType = Required<IdAndNameType> & { month: string };

export type AllSprintData = {
  projectId: string;
  sprints: SprintResponse;
  status: CommonInfo[];
  itemTypes: ItemTypes[];
};

export type ProjectResponse = {
  projects: CommonInfo[];
  owner: {
    id: string;
    name: string;
  };
};

export type SprintResponse = {
  listing: SprintDataType[];
  owner: IdAndNameType;
};

export type ItemsResponse = {
  projectId: string;
  sprints: { sprintId: string; items: any[] }[];
};

export type ZohoItemDetail = {
  projectId: string;
  sprintId: string;
  data: any;
};

export type FinalResponse = { items: any; sprints: AllSprintData[]; teamId: string; projects: ProjectResponse };
