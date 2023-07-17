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
