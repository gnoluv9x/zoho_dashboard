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

export const TableStyled = styled.table<{ listTitles: string[] }>`
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
  }
  table * {
    position: relative;
  }
  table td,
  table th {
    padding-left: 8px;
  }
  table thead tr {
    height: 60px;
    background: #7ed1f3;
  }
  table tbody tr {
    height: 50px;
  }
  table tbody tr:last-child {
    border: 0;
  }
  table td,
  table th {
    text-align: left;
  }
  table td.l,
  table th.l {
    text-align: right;
  }
  table td.c,
  table th.c {
    text-align: center;
  }
  table td.r,
  table th.r {
    text-align: center;
  }

  .table-head th {
    font-size: 18px;
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
    color: #808080;
    line-height: 1.2;
    font-weight: unset;
  }

  tbody tr:hover {
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
      padding-left: 40% !important;
      margin-bottom: 24px;
    }
    table tbody tr td:last-child {
      margin-bottom: 0;
    }
    table tbody tr td:before {
      font-family: OpenSans-Regular;
      font-size: 14px;
      color: #999999;
      line-height: 1.2;
      font-weight: unset;
      position: absolute;
      width: 40%;
      left: 30px;
      top: 0;
    }

    // generate content on mobile
    ${generateContent}

    tbody tr {
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    .table-container {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;
