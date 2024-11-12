import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Time", "Completed", "Unadvised Debit Order", "Uncompleted"],
  [new Date(2022, 4, 10), 10, 28, 9],
  [new Date(2022, 4, 12), 23, 25, 4],
  [new Date(2022, 4, 14), 11, 18, 3],
  [new Date(2022, 4, 16), 3, 23, 27],
];

export const options = {
  title: "My Sales Performance",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    title: "Date",
    format: "MMM dd, yyyy", // Custom date format
    gridlines: { count: 3 }, // Controls the number of gridlines
  },
};

const PerfomanceGraph = () => {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      formatters={[
        {
          column: 0,
          type: "DateFormat",
          options: {
            timeZone: 0,
          },
        },
      ]}
    />
  );
};

export default PerfomanceGraph;
