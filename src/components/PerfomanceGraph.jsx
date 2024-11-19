import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export const options = {
  title: "My Sales Performance",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    title: "Date",
    format: "MMM dd, yyyy",
    gridlines: { count: 5 },
  },
  vAxis: {
    title: "Number of Applications",
  },
  series: {
    0: { pointShape: "circle", pointSize: 10 }, // Completed
    1: { pointShape: "triangle", pointSize: 10 }, // Unadvised Debit Order
    2: { pointShape: "square", pointSize: 10 }, // Uncompleted
  },
};

const PerfomanceGraph = () => {
  const { loading, error, applications } = useSelector(
    (state) => state.applications
  );

  if (loading) return <p>Loading performance data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  // ** Process Applications to Categorize Data **
  const categorizeApplications = (apps) => {
    const dateMap = {};

    apps.forEach((app) => {
      const dateKey = new Date(app.dateCreated).toLocaleDateString("en-CA"); // Standardized date format (YYYY-MM-DD)
      if (!dateMap[dateKey]) {
        dateMap[dateKey] = {
          completed: 0,
          unadvisedDebitOrder: 0,
          uncompleted: 0,
        };
      }

      if (app.status === "completed") {
        dateMap[dateKey].completed++;
      } else if (
        Array.isArray(app.paymentArrangements) &&
        app.paymentArrangements[app.paymentArrangements.length - 1]
          ?.errorItems != null
      ) {
        dateMap[dateKey].unadvisedDebitOrder++;
      } else if (!app.paymentArrangements && app.status !== "completed") {
        dateMap[dateKey].uncompleted++;
      } else if (app.status !== "completed") {
        dateMap[dateKey].uncompleted++;
      }
    });

    return dateMap;
  };

  // Generate chart data dynamically
  const generateChartData = () => {
    const categorized = categorizeApplications(applications);
    const chartData = [
      ["Time", "Completed", "Unadvised Debit Order", "Uncompleted"],
    ];

    Object.keys(categorized)
      .sort((a, b) => new Date(a) - new Date(b)) // Ensure chronological order
      .forEach((date) => {
        const { completed, unadvisedDebitOrder, uncompleted } =
          categorized[date];
        chartData.push([
          new Date(date),
          completed,
          unadvisedDebitOrder,
          uncompleted,
        ]);
      });

    return chartData;
  };

  const chartData = generateChartData();

  return (
    <div style={{ padding: "1rem" }}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
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
    </div>
  );
};

export default PerfomanceGraph;
