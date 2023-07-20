import { REVALIDATE_TIME } from "@/constant";
import { ZohoItemDetail } from "@/types";
import axios from "axios";

export async function getSprint(teamId: string, projectId: string, accessToken: string) {
  const response = await fetch(
    `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/?action=data&index=1&range=100&type=%5B1%2C2%2C3%2C4%5D`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      redirect: "manual",
      next: { revalidate: REVALIDATE_TIME },
    },
  );

  const data = await response.json();
  return {
    id: projectId,
    data,
  };
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
      next: { revalidate: REVALIDATE_TIME },
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
  const url = `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/${sprintId}/item/?action=sprintitems&index=1&range=100&subitem=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    redirect: "manual",
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
