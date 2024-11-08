import CommonTable from "@/components/common/Table";
import { useAppContext } from "@/components/context/App";
import { IdAndNameType } from "@/types";
import { TableColumnCustom } from "@/types/table";
import { TaskDetail } from "@/types/type";
import { convertIsoStringDateToFormated, getFibonancyFromIndex } from "@/utils/helper";
import React from "react";

interface TaskTableProps {}

const TaskTable: React.FC<TaskTableProps> = () => {
  const appContext = useAppContext();
  const loading = appContext?.loading;

  const columns: TableColumnCustom<TaskDetail>[] = [
    {
      fieldName: "name",
      heading: "Name task",
      align: "left",
      customCell: (info) => (
        <div className="line-clamp-3" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    },
    {
      fieldName: "idTaskNumber",
      heading: "Id task",
      align: "left",
    },
    {
      fieldName: "durationTime",
      heading: "Duration time",
      align: "left",
      customCell: (info) => (info.getValue() === "-1" ? "-" : info.getValue()),
    },
    {
      fieldName: "durationPoint",
      heading: "Duration point",
      align: "left",
      customCell: (info) => (info.getValue() === "-1" ? 0 : info.getValue()),
    },
    {
      fieldName: "estimatePoint",
      heading: "Estimate point",
      align: "left",
      customCell: (info) => getFibonancyFromIndex(Number(info.getValue())),
    },
    {
      fieldName: "sprintId",
      heading: "Sprint",
      align: "left",
      customCell: (info) => {
        const sprintId = info.getValue();
        const spintItem: IdAndNameType | undefined = appContext?.listSprints.find((sprint) => sprint.id === sprintId);
        return <span>{spintItem?.name ?? ""}</span>;
      },
    },
    {
      fieldName: "statusTask",
      heading: "Status task",
      align: "left",
      customCell: (info) => {
        const statusId = info.getValue();
        const status = appContext?.listStatus.find((status) => status.id === statusId);
        return <span>{status?.name}</span>;
      },
    },
    {
      fieldName: "timeCreate",
      heading: "Created date",
      align: "left",
      customCell: (info) => {
        const date: any = info.getValue() !== "-1" ? convertIsoStringDateToFormated(info.getValue()) : "-";
        return <span>{date}</span>;
      },
    },
    {
      fieldName: "timeStart",
      heading: "Start date",
      align: "left",
      customCell: (info) => {
        const date: any = info.getValue() !== "-1" ? convertIsoStringDateToFormated(info.getValue()) : "-";
        return <span>{date}</span>;
      },
    },
    {
      fieldName: "itemTypeTitle",
      heading: "Item type",
      align: "left",
      customCell: (info) => <span>{info.getValue()}</span>,
    },
    {
      fieldName: "idProject",
      heading: "Project",
      align: "left",
      customCell: (info) => {
        const value = info.getValue();
        const project = appContext?.listProjects.find((proj) => proj.id === value);
        return <span>{project?.name}</span>;
      },
    },
    {
      fieldName: "userWork",
      heading: "Assigned to",
      align: "left",
      customCell: (info) => {
        const userWorks: string[] = info.getValue();
        if (!userWorks || userWorks.length === 0) return "-";

        const results: string[] = [];
        appContext?.listMembers.forEach((member) => {
          if (Array.isArray(userWorks)) {
            userWorks.forEach((userId) => {
              if (member.id === userId) {
                results.push(member.name);
              }
            });
          } else if (typeof userWorks === "string") {
            if (member.id === userWorks) {
              results.push(member.name);
            }
          }
        });
        return results.join(", ");
      },
    },
  ];

  return <CommonTable columns={columns} data={appContext?.renderItems || []} loading={loading} />;
};

export default TaskTable;
