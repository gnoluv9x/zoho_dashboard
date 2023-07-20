import styled, { css } from "styled-components";

function generateContent(props: { listTitles: string[] }) {
  let styles = "";

  for (let i = 0; i < props.listTitles.length; i += 1) {
    styles += `
      table tbody tr td:nth-child(${i + 1}):before {
        content: "${props.listTitles[i]}";
      }
     `;
  }

  return css`
    ${styles}
  `;
}

export const TableStyled = styled.div<{ listTitles: string[] }>`
  width: 100%;
  margin: 1rem auto;

  table {
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
    border: 1px solid lightgray;
    table-layout: auto;
  }
  table * {
    position: relative;
  }
  table td,
  table th {
    padding-left: 8px;
    border: 1px solid lightgray;
    max-width: 200px;
    line-break: auto;
  }
  table thead tr {
    height: auto;
    background: #222222;
    & > th {
      padding: 0.75rem;
    }
  }
  table tbody tr:not(.empty__row) {
    height: 50px;
  }
  table tbody tr:last-child {
    border: 0;
  }
  .table-head th {
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset;
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  tbody tr {
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: #505050;
    line-height: 1.2;
    font-weight: unset;
  }

  tbody tr:not(> td.empty__row):hover {
    color: #555555;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  @media screen and (max-width: 992px) {
    table {
      display: block;
    }
    table > *,
    table tr,
    table td,
    table th {
      display: block;
    }
    table thead {
      display: none;
    }
    table tbody tr {
      height: auto;
      padding: 37px 0;
    }
    table tbody tr td {
      padding-left: 31% !important;
      margin-bottom: 24px;
      &::before {
        max-width: 150px;
        text-align: end;
      }
    }
    table tbody tr td:last-child {
      margin-bottom: 0;
    }
    table tbody tr td:before {
      font-size: 14px;
      color: #999999;
      line-height: 1.2;
      font-weight: unset;
      position: absolute;
      width: 40%;
      left: 30px;
      top: 0;
    }

    table td {
      max-width: 100%;
      width: auto;
      display: flex;
      justify-content: flex-start;
      line-break: auto;
      border: none;
    }

    // generate content on mobile
    ${generateContent}

    tbody tr {
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    table th {
      border: none;
    }
    table tbody tr td {
      padding-left: 35% !important;
      margin-bottom: 24px;
      &::before {
        max-width: 75px;
        text-align: start;
      }
    }

    .table-container {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;
