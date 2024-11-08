import {
  REVALIDATE_TIME_ONE_DAY,
  REVALIDATE_TIME_ONE_HOUR,
  REVALIDATE_TIME_ONE_MONTH,
  REVALIDATE_TIME_ZERO,
} from "@/constant";
import { ItemTypes, ZohoItemDetail } from "@/types";
import axios from "axios";

const TEAM_ID_URL = "https://sprintsapi.zoho.com/zsapi/teams/";

export async function getTeams(accessToken: string) {
  const response = await fetch(TEAM_ID_URL, {
    method: "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    redirect: "manual",
    next: { revalidate: REVALIDATE_TIME_ONE_MONTH },
  });

  return await response.json();
}

export async function getProjects(teamId: string, accessToken: string) {
  const response = await fetch(
    `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/?action=allprojects&index=1&range=10&viewby=0`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      redirect: "manual",
      next: { revalidate: REVALIDATE_TIME_ONE_DAY },
    },
  );

  return await response.json();
}

export async function getSprint(teamId: string, projectId: string, accessToken: string) {
  const response = await fetch(
    `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/?action=data&index=1&range=100&type=%5B1%2C2%2C3%2C4%5D`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      redirect: "manual",
      next: { revalidate: REVALIDATE_TIME_ONE_HOUR },
    },
  );

  const data = await response.json();
  return {
    id: projectId,
    data,
  };
}

export async function getListItemTypes(teamId: string, projectId: string, accessToken: string): Promise<ItemTypes> {
  const response = await fetch(
    `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/itemtype/?action=alldata`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      redirect: "manual",
      next: { revalidate: REVALIDATE_TIME_ONE_HOUR },
    },
  );

  const data = await response.json();
  const projItemTypeObjArr = Object.keys(data.projItemTypeJObj);

  let results = {
    id: projectId,
    data: [],
  };

  if (projItemTypeObjArr.length > 0) {
    const projItemTypes: any = projItemTypeObjArr.map((projItemTypeId) => {
      const item = data.projItemTypeJObj[projItemTypeId];

      return {
        id: projItemTypeId,
        title: item[1],
      };
    });

    results.data = projItemTypes;
  }

  return results;
}

export async function getListStatus(teamId: string, projectId: string, accessToken: string) {
  const response = await fetch(
    `https://sprints.zoho.com/zsapi/team/${teamId}/projects/${projectId}/itemstatus/?action=data`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      redirect: "manual",
      next: { revalidate: REVALIDATE_TIME_ONE_HOUR },
    },
  );

  const data = await response.json();

  return {
    id: projectId,
    data,
  };
}

export async function getItems(
  teamId: string,
  projectId: string,
  sprintId: string,
  accessToken: string,
): Promise<ZohoItemDetail> {
  const url = `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/${sprintId}/item/?action=sprintitems&index=1&range=1000&subitem=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    redirect: "manual",
    next: { revalidate: REVALIDATE_TIME_ZERO },
  });

  const data = await response.json();

  return {
    projectId,
    sprintId,
    data,
  };
}

export async function getAccessToken() {
  return await axios.post("/api/refreshToken");
}
