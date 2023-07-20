import React from "react";
import CommonTable from "../Common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { TaskDetail } from "@/types/type";
import { getFibonancyFromIndex } from "@/utils/helper";
import { IdAndNameType, ZohoItemDetail } from "@/types";

interface TaskTableProps {
  listSprints: IdAndNameType[];
  data: ZohoItemDetail[];
}

const columnHelper = createColumnHelper<TaskDetail>();

const TaskTable: React.FC<TaskTableProps> = ({ listSprints, data }) => {
  console.log("Debug_here data: ", data);
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => "Name task",
      footer: (info) => info.header.id,
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("idTask", {
      header: () => "Id task",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("estimate", {
      header: () => "Duration",
      footer: (info) => info.column.id,
      cell: (info) => (info.getValue() !== "-1" ? null : info.getValue()),
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("estimatePoint", {
      header: "Estimate point",
      cell: (info) => getFibonancyFromIndex(Number(info.getValue())),
      footer: (info) => info.column.id,
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("sprintId", {
      header: "Sprint",
      cell: (info) => {
        const sprintId = info.getValue();
        const spintItem: IdAndNameType | undefined = listSprints.find((sprint) => sprint.id === sprintId);
        return <span>{spintItem?.name ?? ""}</span>;
      },
      footer: (info) => info.column.id,
      meta: {
        align: "center",
      },
    }),
  ];

  return (
    <>
      <CommonTable columns={columns} data={data} />
    </>
  );
};

export default TaskTable;
