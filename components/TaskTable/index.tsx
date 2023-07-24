import { CommonInfo, IdAndNameType } from "@/types";
import { TableColumnCutom } from "@/types/table";
import { TaskDetail } from "@/types/type";
import { convertIsoStringDateToFormated, getFibonancyFromIndex } from "@/utils/helper";
import React from "react";
import CommonTable from "../Common/Table";
import { useAppContext } from "@/app/context/App";

interface TaskTableProps {
  loading: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({ loading }) => {
  const appContext = useAppContext();

  const columns: TableColumnCutom<TaskDetail>[] = [
    {
      fieldName: "name",
      heading: "Name task",
      align: "left",
    },
    {
      fieldName: "idTaskNumber",
      heading: "Id task",
      align: "center",
    },
    {
      fieldName: "estimate",
      heading: "Duration",
      align: "center",
      customCell: (info) => (info.getValue() === "-1" ? "-" : info.getValue()),
    },
    {
      fieldName: "estimatePoint",
      heading: "Estimate point",
      align: "center",
      customCell: (info) => getFibonancyFromIndex(Number(info.getValue())),
    },
    {
      fieldName: "sprintId",
      heading: "Sprint",
      align: "center",
      customCell: (info) => {
        const sprintId = info.getValue();
        const spintItem: IdAndNameType | undefined = appContext?.listSprints.find((sprint) => sprint.id === sprintId);
        return <span>{spintItem?.name ?? ""}</span>;
      },
    },
    {
      fieldName: "statusTask",
      heading: "Status task",
      align: "center",
      customCell: (info) => {
        const statusId = info.getValue();
        const status = appContext?.listStatus.find((status) => status.id === statusId);
        return <span>{status?.name}</span>;
      },
    },
    {
      fieldName: "timeCreate",
      heading: "Created date",
      align: "center",
      customCell: (info) => {
        const date: any = info.getValue() !== "-1" ? convertIsoStringDateToFormated(info.getValue()) : "-";
        return <span>{date}</span>;
      },
    },
    {
      fieldName: "timeStart",
      heading: "Start date",
      align: "center",
      customCell: (info) => {
        const date: any = info.getValue() !== "-1" ? convertIsoStringDateToFormated(info.getValue()) : "-";
        return <span>{date}</span>;
      },
    },
    {
      fieldName: "idProject",
      heading: "Project",
      align: "center",
      customCell: (info) => {
        const value = info.getValue();
        const project = appContext?.listProjects.find((proj) => proj.id === value);
        return <span>{project?.name}</span>;
      },
    },
    {
      fieldName: "userWork",
      heading: "Assigned to",
      align: "center",
      customCell: (info) => {
        const listUserWorks: string[] = info.getValue();
        if (listUserWorks.length === 0) return "-";

        const results: string[] = [];
        appContext?.listMembers.forEach((member) => {
          listUserWorks.forEach((userId) => {
            if (member.id === userId) {
              results.push(member.name);
            }
          });
        });
        return results.join(", ");
      },
    },
  ];

  return <CommonTable columns={columns} data={appContext?.renderItems || []} loading={loading} />;
};

export default TaskTable;
