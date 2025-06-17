import React from 'react';
import { Chart } from "react-google-charts";

const PieChartPresentation = ({ data }) => {
    const options = {
        title: "Categories",
      };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"100%"}
    />
);
};

export default PieChartPresentation;
