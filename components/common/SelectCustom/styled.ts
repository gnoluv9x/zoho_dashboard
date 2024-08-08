import styled from "styled-components";
import ReactSelect from "react-select";

export const SelectWrapperStyled = styled.div`
  .select-custom__value-container--is-multi {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`;
