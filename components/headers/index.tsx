"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Avatar from "../Common/Avatar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "@/constant";
import { useAppContext } from "@/app/context/App";
import Image from "next/image";
import * as XLSX from "xlsx";
import { TaskDetail } from "@/types/type";
import { convertIsoStringDateToFormated, getFibonancyFromIndex } from "@/utils/helper";
import { IdAndNameType } from "@/types";

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

  return (
    <header className="px-5 fixed z-header top-0 left-0 right-0 h-14 flex justify-end items-center bg-blue-600 text-white text-sm md:text-2xl font-bold">
      <div className="flex flex-row w-full justify-between text-white">
        <div className="flex items-center gap-x-2">
          <div>Total tasks: {appContext?.renderItems.length}</div>
          <div className="hover:cursor-pointer" title="Tải xuống danh sách" onClick={handleExport}>
            <Image className="" src={"/download.svg"} width={28} height={28} alt="download icon" />
          </div>
        </div>

        <div className="text-white flex">
          <div className="mr-2 flex gap-2 items-center">
            <Avatar className="w-6 h-6 rounded-full " />
            <span className="">{process.env.NEXT_PUBLIC_ZOHO_USERNAME}</span>
          </div>
          <div className="mr-2 w-[1px] h-7 bg-[#aaa] my-2"></div>
          <button onClick={handleLogout} className="p-1 font-normal">
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
