import React from "react";
import { PaginationStyled } from "./styled";
import { StringOrNumber } from "@/types/type";
import { DOTS, PaginationHookType, usePagination } from "@/hooks/usePagination";
import classNames from "classnames";

interface PaginationProps {
  onPageChange: (val: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  align?: "left" | "right" | "center";
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = "",
  align = "left",
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange || []).length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : 0;

  return (
    <PaginationStyled align={align}>
      <ul className={classNames("pagination-container", { [className]: className })}>
        <li
          className={classNames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange &&
          paginationRange.map((pageNumber: PaginationHookType) => {
            if (pageNumber === DOTS) {
              return (
                <li key={pageNumber} className="pagination-item dots">
                  &#8230;
                </li>
              );
            }
            return (
              <li
                key={pageNumber}
                className={classNames("pagination-item", {
                  selected: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </li>
            );
          })}
        <li
          className={classNames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </PaginationStyled>
  );
};

export default Pagination;
