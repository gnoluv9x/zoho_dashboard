import styled from "styled-components";
import DatePicker from "react-datepicker";

export const DatePickerStyled = styled(DatePicker)`
  .react-datepicker__tab-loop {
    display: inline-block;
  }
  &&&.react-datepicker-wrapper {
    height: 36px;
  }
` as any;
