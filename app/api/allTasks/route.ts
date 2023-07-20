import { ACCESS_TOKEN_KEY, INVALID_TOKEN_CODE, REVALIDATE_TIME } from "@/constant";
import {
  AllSprintData,
  CommonInfo,
  IdAndNameType,
  ZohoItemDetail,
  ItemsResponse,
  ProjectResponse,
  FinalResponse,
} from "@/types";
import { TaskDetail } from "@/types/type";
import { getItems, getListStatus, getSprint } from "@/utils/listApis";
import { authenticationFailed, emptyResponse } from "@/utils/response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const TEAM_ID_URL = "https://sprintsapi.zoho.com/zsapi/teams/";
const getProjectUrl = (teamId: string): string =>
  `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/?action=allprojects&index=1&range=10&viewby=0`;

export async function GET(req: Request) {
  // check authen
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  if (!accessToken) return authenticationFailed();

  // get teamId
  const teamResp = await fetch(TEAM_ID_URL, {
    method: "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    redirect: "manual",
    next: { revalidate: REVALIDATE_TIME },
  });
  const teamIdData = await teamResp.json();

  if (teamIdData?.status === "failed" && teamIdData?.code === INVALID_TOKEN_CODE)
    return authenticationFailed("Invalid token");

  // handle fetch team error
  if (teamIdData?.status === "failed" && teamIdData?.code === INVALID_TOKEN_CODE)
    return authenticationFailed("Invalid token");

  if (!teamIdData?.portals || teamIdData?.portals.length === 0) return emptyResponse("You dont own teamid");

  const teamId = teamIdData?.portals[0].zsoid;

  // get all projects
  const projectResp = await fetch(getProjectUrl(teamId), {
    method: "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    redirect: "manual",
    next: { revalidate: REVALIDATE_TIME },
  });
  const projectData = await projectResp.json();

  if (projectData?.status === "failed" && projectData?.code === INVALID_TOKEN_CODE)
    return authenticationFailed("Invalid token");

  if (!projectData?.projectJObj || Object.keys(projectData.projectJObj).length === 0)
    return emptyResponse("You dont own project");

  const userId = Object.keys(projectData?.userDisplayName)[0];
  const projectInfos: ProjectResponse = {
    projects: Object.keys(projectData.projectJObj).map((key) => {
      const data = projectData.projectJObj[key];

      return {
        id: key,
        name: data[0],
        createdAt: data[9],
      };
    }),
    owner: {
      id: userId,
      name: projectData?.userDisplayName[userId],
    },
  };

  // fetch all sprints:
  const results = await Promise.all(
    projectInfos.projects.map((project) => {
      return Promise.all([getSprint(teamId, project.id, accessToken), getListStatus(teamId, project.id, accessToken)]);
    }),
  );

  if (results.length === 0) return emptyResponse("You dont own sprints");

  const allSprintsOfProject: AllSprintData[] = [];

  results.forEach((item: any) => {
    const projectId = item[0].id;
    const sprintData = item[0].data;
    const statusData = item[1].data;
    const userId = Object.keys(sprintData.userDisplayName)[0];

    const sprintItem = {
      listing: Object.keys(sprintData.sprintJObj || {}).reduce((acc, currentKey) => {
        const data = sprintData.sprintJObj[currentKey];
        const value = {
          id: currentKey,
          name: data[0],
        };
        acc.push(value as never);
        return acc;
      }, []),
      owner: {
        id: userId,
        name: sprintData.userDisplayName[userId],
      },
    };

    const statusItem = Object.keys(statusData.statusJObj).map((statusId: string) => {
      const data = statusData.statusJObj[statusId];
      return {
        id: statusId,
        name: data[0],
        createdAt: data[7],
      };
    });

    allSprintsOfProject.push({ projectId, sprints: sprintItem, status: statusItem });
  });

  const itemsOfProjectResponse = await Promise.all(
    allSprintsOfProject.map((item: AllSprintData) => {
      const { projectId, sprints } = item;
      return Promise.all(
        sprints.listing.map((sprint) => {
          return getItems(teamId, projectId, sprint.id, accessToken);
        }),
      );
    }),
  );

  // validate response status
  const itemResponse = itemsOfProjectResponse[0][0].data;
  if (itemResponse?.status === "failed" && itemResponse?.code === INVALID_TOKEN_CODE)
    return authenticationFailed("Invalid token");

  let itemResults: any; // [ {projectId : "", sprints: [{ sprintId : "", items: [] }]} ]

  itemResults = itemsOfProjectResponse.map((projectItem: ZohoItemDetail[]) => {
    if (projectItem.length === 0) return [];

    let projectId = "";
    let sprints: any = [];

    projectItem.forEach((item: ZohoItemDetail) => {
      const data = item.data;
      const sprintId = item.sprintId;
      if (!projectId) projectId = item.projectId;

      const members: IdAndNameType[] = Object.entries<string>(data?.userDisplayName || {}).map(([key, value]) => ({
        id: key,
        name: value,
      }));

      const tasks: TaskDetail[] = data?.itemJObj
        ? Object.entries<any[]>(data.itemJObj).map(([key, value]) => {
            return {
              idTask: key,
              idProject: item.projectId,
              name: value[0],
              taskDetail: value[1],
              idTaskNumber: value[2],
              estimate: value[4],
              timeStart: value[6] === "-1" ? null : value[6],
              timeEnd: value[7] === "-1" ? null : value[7],
              estimatePoint: value[15],
              timeCreate: value[19],
              sprintId: value[26],
              statusTask: value[29],
              priorityId: value[31],
              userWork: value[33],
            };
          })
        : [];

      sprints.push({ sprintId, items: { members, tasks } });
    });

    return { projectId, sprints };
  });

  const finalResults: FinalResponse = {
    items: itemResults,
    sprints: allSprintsOfProject,
    teamId,
    projects: projectInfos,
  };
  return NextResponse.json(finalResults);
}