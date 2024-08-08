"use client";

import Avatar from "@/components/common/Avatar";
import { useAppContext } from "@/components/context/App";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN_KEY } from "@/constant";
import { AllSprintData, CommonInfo, FinalResponse, IdAndNameType, ItemTypes, SprintDataType } from "@/types";
import { TaskDetail } from "@/types/type";
import axiosClient from "@/utils/api";
import {
  checkTaskItemInSprintWithMonth,
  cn,
  convertIsoStringDateToFormated,
  getChartDataFromItems,
  getFibonancyFromIndex,
  removeDuplicate,
  sortFollowDate,
} from "@/utils/helper";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { ChartColumnBig, ListTodo } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as XLSX from "xlsx";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  const router = useRouter();

  const appContext = useAppContext();

  if (pathname === "/auth") {
    return false;
  }

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    router.push("/auth");
  };

  const handleExport = () => {
    const dataItems = appContext?.renderItems || [];
    const customData =
      dataItems?.length > 0
        ? dataItems?.map((item: TaskDetail, ind: number) => {
            const sprintId = item.sprintId;
            const spintItem: IdAndNameType | undefined = appContext?.listSprints.find(
              (sprint) => sprint.id === sprintId,
            );
            const status = appContext?.listStatus.find((status) => status.id === item.statusTask);
            const timeCreated: any = item.timeCreate !== "-1" ? convertIsoStringDateToFormated(item.timeCreate) : "-";
            const timeStart: any = item.timeStart !== "-1" ? convertIsoStringDateToFormated(item.timeStart) : "-";
            const project = appContext?.listProjects.find((proj) => proj.id === item.idProject);

            const listUserWorks: string[] = item.userWork;
            if (listUserWorks.length === 0) return "-";

            const resultUsers: string[] = [];
            appContext?.listMembers.forEach((member) => {
              listUserWorks.forEach((userId) => {
                if (member.id === userId) {
                  resultUsers.push(member.name);
                }
              });
            });

            return {
              "Name task": item?.name,
              "Id task": item?.idTaskNumber,
              Duration: item?.estimate === "-1" ? "" : item?.estimate,
              "Estimate time": item?.estimateTime,
              "Estimate point": getFibonancyFromIndex(Number(item.estimatePoint)),
              "Id sprint": spintItem?.name ?? "",
              "Status task": status?.name ?? "",
              "Date created": timeCreated,
              "Date started": timeStart,
              "Item type": item.itemTypeTitle,
              Project: project?.name || "",
              "Assigned to": resultUsers.join(","),
            };
          })
        : [
            {
              "Name task": null,
              "Id task": null,
              Duration: null,
              "Extimate point": null,
              "Id Sprint": null,
              "Status task": null,
              "Date created": null,
              "Date started": null,
              "Item type": null,
              Project: null,
              "Assigned to": null,
            },
          ];

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(customData);
    const dateNow = new Date();
    const hours = dateNow.getHours();
    const minutes = ("0" + dateNow.getMinutes()).slice(-2);
    const seconds = ("0" + dateNow.getSeconds()).slice(-2);
    const days = ("0" + dateNow.getDate()).slice(-2);
    const month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    const year = dateNow.getFullYear();
    const currentDate = `${hours}_${minutes}_${seconds}_${days}_${month}_${year}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DS_Tasks_" + currentDate + ".xlsx");
  };

  const handleRespData = (data: FinalResponse) => {
    appContext?.setListProjects(data.projects.projects);

    // list stataus
    let listStatus: CommonInfo[] = [];
    let listSprints: SprintDataType[] = [];
    let listItemType: ItemTypes[] = [];

    data.sprints.forEach((item: AllSprintData) => {
      listStatus = listStatus.concat(item.status);
      listSprints = listSprints.concat(item.sprints.listing);
      listItemType = listItemType.concat(item.itemTypes);
    });

    const nonDuplicateListStatus = removeDuplicate(listStatus, "id");
    appContext?.setListStatus(nonDuplicateListStatus);
    appContext?.setListSprints(listSprints);
    appContext?.setListItemTypes(removeDuplicate(listItemType, "id"));

    // list all items
    const listAllItems: TaskDetail[] = [];
    const listAllMembers: IdAndNameType[] = [];
    (data.items || []).forEach((item: any, idx: number) => {
      item.sprints.forEach((sprint: any) => {
        const listTaskOfSprint = sprint.items.tasks;
        const listMemberOfSprint = sprint.items.members;

        listAllItems.push(...listTaskOfSprint);
        listAllMembers.push(...listMemberOfSprint);
      });
    });

    // sort follow created date
    sortFollowDate(listAllItems, "timeCreate", "desc");

    appContext?.setListAllItems(listAllItems);

    // lấy các items trong tháng hiện tại: do bộ lọc để mặc định tháng hiện tại khi render lần đầu
    const currentMonthYear = dayjs().format("MM/YYYY");
    appContext?.setRenderItems(
      listAllItems.filter((item) => checkTaskItemInSprintWithMonth(listSprints, item, currentMonthYear)),
    );

    const listAllNoDuplicateMember = removeDuplicate(listAllMembers, "id");
    appContext?.setListMembers(listAllNoDuplicateMember);

    // lấy các chartdata
    appContext?.setChartData(
      getChartDataFromItems(listAllItems, listSprints, nonDuplicateListStatus, listAllNoDuplicateMember),
    );
  };

  useEffect(() => {
    appContext?.setLoading(true);

    axiosClient
      .get("/allTasks")
      .then((resp: AxiosResponse<FinalResponse>) => {
        handleRespData(resp.data);
      })
      .catch((err) => {
        console.log("Debug_here err: ", err);
      })
      .finally(() => {
        appContext?.setLoading(false);
      });
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-header col-start-auto flex h-14 items-center justify-end bg-blue-600 px-5 text-sm font-bold text-white md:text-2xl">
      <div className="flex w-full flex-row justify-between text-white">
        <div className="flex items-center gap-x-2">
          <div>Total tasks: {appContext?.renderItems.length}</div>
          <div className="hover:cursor-pointer" title="Tải xuống danh sách" onClick={handleExport}>
            <Image className="" src={"/download.svg"} width={28} height={28} alt="download icon" />
          </div>
        </div>

        <div className="header-route flex flex-1 items-center justify-center gap-[2px] lg:gap-2">
          <Button
            variant="link"
            className={cn("group text-gray-400 hover:text-white hover:no-underline", [
              pathname === "/" ? "font-medium text-white" : "",
            ])}
            onClick={() => router.push("/")}
          >
            <ListTodo
              className={cn("mr-0 text-gray-400 hover:text-white group-hover:text-white lg:mr-2", [
                pathname === "/" ? "text-white" : "",
              ])}
            />{" "}
            <span className="hidden lg:inline">Task list</span>
          </Button>
          <span className="my-auto">|</span>
          <Button
            variant="link"
            className={cn("group text-gray-400 hover:text-white hover:no-underline", [
              pathname === "/member-performance" ? "text-white" : "",
            ])}
            onClick={() => router.push("/member-performance")}
          >
            <ChartColumnBig
              className={cn("mr-0 text-gray-400 group-hover:text-white lg:mr-2", [
                pathname === "/member-performance" ? "text-white" : "",
              ])}
            />{" "}
            <span className="hidden lg:inline">Member performance</span>
          </Button>
        </div>

        <div className="flex text-white">
          <div className="mr-2 flex items-center gap-2">
            <Avatar className="h-6 w-6 rounded-full" />
            <span className="hidden lg:inline">{process.env.NEXT_PUBLIC_ZOHO_USERNAME}</span>
          </div>
          <div className="my-2 mr-2 h-7 w-[1px] bg-[#aaa]"></div>
          <button onClick={handleLogout} className="p-1 font-normal">
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
