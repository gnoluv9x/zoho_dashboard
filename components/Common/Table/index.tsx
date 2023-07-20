import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { TableStyled } from "./styled";

interface TableProps {
  loading?: boolean;
  data?: any[];
  columns?: any[];
  listTitles?: string[];
}

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const defaultColumns = [
  columnHelper.group({
    id: "full name",
    header: () => <span>Full name</span>,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue().toUpperCase(),
        header: () => <span>First Name</span>,
        footer: (info) => info.header.id,
        meta: {
          align: "center",
        },
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: (info) => info.column.id,
        meta: {
          align: "center",
        },
      }),
    ],
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    meta: {
      align: "center",
    },
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
    meta: {
      align: "center",
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
    meta: {
      align: "center",
    },
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
    meta: {
      align: "center",
    },
  }),
];

const CommonTable: React.FC<TableProps> = ({
  loading,
  data = defaultData,
  columns = defaultColumns,
  listTitles = ["First Name", "Last Name", "Age", "Visits", "Status", "Progress"],
}) => {
  const reactTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableStyled className="table-container" listTitles={listTitles}>
      <table>
        <thead>
          {reactTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="table-head">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    align={(header.column.columnDef.meta as any)?.align}
                    onClick={header.column.getToggleSortingHandler()}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {reactTable.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} align={(cell.column.columnDef.meta as any)?.align}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyled>
  );
};

export default CommonTable;
