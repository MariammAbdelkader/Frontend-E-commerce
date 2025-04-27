import React, { useState } from 'react';
import AnalyticsChartView from './AnalyticsChartPresentation';

const AnalyticsChart = ({ data, title, year, dataKey }) => {
    // 👇 New state: selected value from details
    const [selectedQuarter, setSelectedQuarter] = useState('total');
    const validMetrics = ['conversionRate', 'grossRate', 'returnRate', 'Profit', 'Revenue'];
    const summableMetrics = ['Profit', 'Revenue'];
    const isSummableMetric = summableMetrics.includes(dataKey) && data.details;

  if (!validMetrics.includes(dataKey)) {
    console.error(`Invalid dataKey: ${dataKey}. Must be one of ${validMetrics.join(', ')}`);
    return <div>Error: Invalid metric selected.</div>;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthsInYear = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    date: `${monthNames[i]}-${year}`,
  }));

  const formattedData = monthsInYear.map(monthItem => {
    const dataItem = data.find(item => item.month === monthItem.month);
    return {
      date: monthItem.date,
      value: dataItem ? dataItem[dataKey] : 0,
    };
  });

  const fallbackData = monthNames.map((month) => ({
    date: `${month}-${year}`,
    value: 0,
  }));

  const displayData = data.length > 0 ? formattedData : fallbackData;



  // 👇 Extract details safely
  const details = data.details?data.details : {
    total: 0,
    quarter1: 0,
    quarter2: 0,
    quarter3: 0,
    quarter4: 0,
  };

  return (
    <AnalyticsChartView 
      title={title}
      chartData={displayData}
      details={details}
      selectedQuarter={selectedQuarter}
      onChangeQuarter={setSelectedQuarter}
      isSummableMetric={isSummableMetric}
    />
  );
};

export default AnalyticsChart;
