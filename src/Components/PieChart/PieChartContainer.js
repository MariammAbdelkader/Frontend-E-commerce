import React, { useEffect, useState } from 'react';
import PieChartPresentation from './PieChartPresentation';

const PieChartContainer = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const PieChartData = async () => {
      try {
        const arrayData = [
          ['category', 'revenue'],  // header
          ...data.map(item => [item.category, item.revenue])
        ];
        
        console.log("PieChartData:", arrayData)
        setChartData(arrayData)
      } catch (error) {
        console.error('Failed to get data', error);
      }
    };

    if (data && Array.isArray(data)) {
      PieChartData();
    }

  }, [data]);

  return <PieChartPresentation data={chartData} />;
};

export default PieChartContainer;
