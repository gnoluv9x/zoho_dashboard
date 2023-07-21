import Pagination from "@/components/Pagination";
import { DEFAULT_PAGE, PAGE_SIZE_OPTIONS } from "@/constant";
import { TableColumnCutom } from "@/types/table";
import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Empty from "../Empty";
import { TableStyled } from "./styled";

interface TableProps<T> {
  loading?: boolean;
  data: T[];
  columns: TableColumnCutom<T>[];
  paginationProps?: PaginationState & {
    className?: string;
    align?: "left" | "right" | "center";
  };
}

const CommonTable = <T extends object>({
  loading,
  data,
  columns,
  paginationProps = {
    pageSize: PAGE_SIZE_OPTIONS[0],
    pageIndex: DEFAULT_PAGE - 1, // start index = 0
  },
}: TableProps<T>) => {
  const columnHelper = createColumnHelper<T>();

  const listTitles: string[] = [];
  const customColumns = columns.map((column) => {
    listTitles.push(typeof column.heading === "function" ? column.heading() : column.heading);

    return columnHelper.accessor(column.fieldName as any, {
      header: column.heading,
      footer: (info) => info.header.id,
      meta: {
        align: column?.align || "left",
      },
      cell: column?.customCell ? column.customCell : (info: any) => info.getValue(),
    });
  });

  const reactTable = useReactTable({
    data,
    columns: customColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: paginationProps,
    },
  });

  const handleChangePage = (val: number) => {
    reactTable.setPageIndex(val - 1); // page index is count from 0
  };

  return (
    <TableStyled className="table-container relative" listTitles={listTitles}>
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
          {reactTable.getRowModel().rows.length > 0 ? (
            reactTable.getRowModel().rows.map((row) => {
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
            })
          ) : (
            <tr className="empty__row w-full h-[400px] bg-slate-50">
              <td colSpan={listTitles.length}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        className={`pagination-bar my-2 ${paginationProps?.className}`}
        currentPage={reactTable.getState().pagination.pageIndex + 1}
        pageSize={reactTable.getState().pagination.pageSize}
        totalCount={data.length}
        onPageChange={handleChangePage}
        align={paginationProps?.align || "right"}
      />
    </TableStyled>
  );
};

export default CommonTable;
