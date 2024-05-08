import { ACCESS_TOKEN_KEY, INVALID_TOKEN_CODE } from "@/constant";
import { AllSprintData, FinalResponse, IdAndNameType, ItemType, ProjectResponse, ZohoItemDetail } from "@/types";
import { TaskDetail } from "@/types/type";
import { getItemProps } from "@/utils/helper";
import { getItems, getListItemTypes, getListStatus, getProjects, getSprint, getTeams } from "@/utils/listApis";
import { authenticationFailed, emptyResponse, errorResponse } from "@/utils/response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // check authen
    const cookieStore = cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

    if (!accessToken) return authenticationFailed();

    // get teamId
    const teamIdData = await getTeams(accessToken);

    if (teamIdData?.status === "failed" && teamIdData?.code === INVALID_TOKEN_CODE)
      return authenticationFailed("Invalid token");

    // handle fetch team error
    if (teamIdData?.status === "failed" && teamIdData?.code === INVALID_TOKEN_CODE)
      return authenticationFailed("Invalid token");

    if (!teamIdData?.portals || teamIdData?.portals.length === 0) return emptyResponse("You dont own teamid");

    const teamId = teamIdData?.portals[0].zsoid;

    // get all projects
    const projectData = await getProjects(teamId, accessToken);

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

    // fetch all sprints (status, itemTypes):
    const results = await Promise.all(
      projectInfos.projects.map((project) => {
        return Promise.all([
          getSprint(teamId, project.id, accessToken),
          getListStatus(teamId, project.id, accessToken),
          getListItemTypes(teamId, project.id, accessToken),
        ]);
      }),
    );

    if (results.length === 0) return emptyResponse("You dont own sprints");

    const allSprintsOfProject: AllSprintData[] = [];
    let listAllItemTypes: Record<ItemType["id"], ItemType["title"]> = {};

    results.forEach((item: any) => {
      const projectId = item[0].id;
      const sprintData = item[0].data;
      const statusData = item[1].data;
      const itemTypesData = item[2].data;
      itemTypesData.forEach((itemType: ItemType) => {
        listAllItemTypes[itemType.id] = itemType.title;
      });

      const userId =
        sprintData?.userDisplayName && sprintData?.userDisplayName.length !== 0
          ? Object.keys(sprintData.userDisplayName)?.[0]
          : "";

      const sprintItem = {
        listing: sprintData?.sprintJObj
          ? Object.keys(sprintData.sprintJObj || {}).reduce((acc, currentKey) => {
              const data = sprintData.sprintJObj[currentKey];
              const value = {
                id: currentKey,
                name: data[0],
              };
              acc.push(value as never);
              return acc;
            }, [])
          : [],
        owner: {
          id: userId,
          name: userId ? sprintData.userDisplayName[userId] : "",
        },
      };

      const statusItem = statusData?.statusJObj
        ? Object.keys(statusData.statusJObj).map((statusId: string) => {
            const data = statusData.statusJObj[statusId];
            return {
              id: statusId,
              name: data[0],
              createdAt: data[7],
            };
          })
        : [];

      allSprintsOfProject.push({ projectId, sprints: sprintItem, status: statusItem, itemTypes: itemTypesData });
    });

    const itemsOfProjectResponse = await Promise.all(
      allSprintsOfProject.map((item: AllSprintData) => {
        const { projectId, sprints } = item;

        if (sprints.listing.length === 0)
          return [
            {
              projectId,
              sprintId: "",
              data: "",
            },
          ];

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

      projectItem.forEach((zohoItem: ZohoItemDetail, idx) => {
        const data = zohoItem.data;

        const itemProps = getItemProps(zohoItem.data?.item_prop) as Record<Partial<keyof TaskDetail>, number>;

        const sprintId = zohoItem.sprintId;
        if (!projectId) projectId = zohoItem.projectId;

        const members: IdAndNameType[] = data?.userDisplayName
          ? Object.entries<string>(data.userDisplayName).map(([key, value]) => ({
              id: key,
              name: value,
            }))
          : [];

        const tasks: TaskDetail[] = data?.itemJObj
          ? Object.entries<any[]>(data.itemJObj).map(([key, value], idx) => {
              const itemTypeId = value[itemProps.itemTypeId] || "";
              let itemTypeTitle = listAllItemTypes[itemTypeId] || "";

              return {
                idTask: key,
                idProject: zohoItem.projectId,
                name: value[itemProps.name],
                taskDetail: value[itemProps.taskDetail],
                idTaskNumber: value[itemProps.idTaskNumber], // id: 573, 574....
                estimate: value[itemProps.estimate], // khoảng thời gian estimate
                timeStart: value[itemProps.timeStart] === "-1" ? null : value[itemProps.timeStart], // Ngày bắt đầu task
                timeEnd: value[itemProps.timeEnd] === "-1" ? null : value[itemProps.timeEnd], // Ngày kết thúc task
                estimatePoint: value[itemProps.estimatePoint], // Index của point trong dãy fibonanci
                timeCreate: value[itemProps.timeCreate], // Ngày tạo task
                sprintId: value[itemProps.sprintId], // Id của sprint
                statusTask: value[itemProps.statusTask], // Id trạng thái task:
                itemTypeId,
                itemTypeTitle,
                userWork: value[itemProps.userWork], // Người làm
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
  } catch (error) {
    console.log("Debug_here error: ", error);
    return errorResponse();
  }
}
