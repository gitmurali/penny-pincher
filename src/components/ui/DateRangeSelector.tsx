import React from "react";
import { DateRangePicker } from "@matharumanpreet00/react-daterange-picker";

type Props = {
  open: boolean;
  setDateRange: React.Dispatch<any>;
};

const DateRangeSelector: React.FunctionComponent<Props> = ({
  setDateRange,
  open,
}) => {
  return (
    <DateRangePicker
      open={open as any}
      onChange={(range) => setDateRange(range)}
    />
  );
};

export default DateRangeSelector;
