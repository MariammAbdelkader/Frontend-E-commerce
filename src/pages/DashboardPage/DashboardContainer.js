import React, { useState, useEffect } from 'react';
import { getRevenueAnalytics,getProfitAnalytics,getreturnRatetAnalytics,getgrossRateAnalytics,getconversionRateAnalytics } from './DashboardServices';
import DashboardPresentation from './DashboardPresentation';

const DashboardContainer = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [ProfitData, setProfitData] = useState([]);
  const [returnRateData, setreturnRateData] = useState([]);
  const [grossRateData, setgrossRateData] = useState([]);
  const [conversionRateData, setconversionRateData] = useState([]);


  const [selectedYear, setSelectedYear] = useState(2025); // Default year is 2025

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const revenueRepoonse = await getRevenueAnalytics({ year: selectedYear });
        const profitRepoonse = await getProfitAnalytics({ year: selectedYear });
        const returnRateRepoonse = await getreturnRatetAnalytics({ year: selectedYear });
        const grossRateRepoonse = await getgrossRateAnalytics({ year: selectedYear });
        const conversionRateRepoonse = await getconversionRateAnalytics({ year: selectedYear });
        
        setRevenueData(revenueRepoonse);
        setProfitData(profitRepoonse);
        setreturnRateData(returnRateRepoonse);  
        setgrossRateData(grossRateRepoonse);
        setconversionRateData(conversionRateRepoonse);

      } catch (error) {
        console.error('Error fetching revenue analytics:', error);
      }
    };

    fetchRevenueData();
  }, [selectedYear]); // Fetch data whenever the year changes

  return (
    <DashboardPresentation
        revenueData={revenueData}
        ProfitData={ProfitData}
        returnRateData={returnRateData}
        grossRateData={grossRateData}
        conversionRateData={conversionRateData}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear} // Pass the year change handler to the presentation
    />
  );
};

export default DashboardContainer;
