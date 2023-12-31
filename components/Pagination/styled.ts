import { ALIGN_VALUE } from "@/constant";
import styled from "styled-components";

type PaginationStyleProps = {
  align: "left" | "right" | "center";
};

export const PaginationStyled = styled.div<PaginationStyleProps>`
  display: flex;
  justify-content: ${(props) => ALIGN_VALUE[props.align]};

  .pagination-container {
    display: flex;
    list-style-type: none;

    .pagination-item {
      padding: 0 12px;
      height: 32px;
      text-align: center;
      margin: auto 4px;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      box-sizing: border-box;
      align-items: center;
      letter-spacing: 0.01071em;
      /* border-radius: 16px; */
      line-height: 1.43;
      font-size: 13px;
      min-width: 32px;

      &.dots:hover {
        background-color: transparent;
        cursor: default;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.14);
        cursor: pointer;
        border-radius: 4px;
      }

      &.selected {
        background-color: #0066ff;
        color: #fff;
        font-weight: 400;
        border-radius: 4px;
      }

      .arrow {
        &::before {
          position: relative;
          /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
          content: "";
          /* By using an em scale, the arrows will size with the font */
          display: inline-block;
          width: 0.4em;
          height: 0.4em;
          border-right: 0.12em solid rgba(0, 0, 0, 0.87);
          border-top: 0.12em solid rgba(0, 0, 0, 0.87);
        }

        &.left {
          transform: rotate(-135deg) translate(-50%);
        }

        &.right {
          transform: rotate(45deg);
        }
      }

      &.disabled {
        pointer-events: none;

        .arrow::before {
          border-right: 0.12em solid rgba(0, 0, 0, 0.43);
          border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }

        &:hover {
          background-color: transparent;
          cursor: default;
        }
      }
    }

    // xs screen
    @media screen and (max-width: 639.98px) {
      font-size: 14px;
      margin-bottom: 1rem;
      .pagination-item {
        padding: 0 6px;
        min-width: 20px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
