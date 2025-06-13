import React, { useState, useEffect } from 'react';
import { getRevenueAnalytics,getProfitAnalytics,
  getreturnRatetAnalytics,getgrossRateAnalytics,
  getconversionRateAnalytics,getTopCategories,getMonthlyAnalytics,
getGrowthRateProfit,getGrowthRateRevenue } from '../../../Services/DashboardServices';
import DashboardPresentation from './DashboardPresentation';

const DashboardContainer = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [ProfitData, setProfitData] = useState([]);
  const [returnRateData, setreturnRateData] = useState([]);
  const [grossRateData, setgrossRateData] = useState([]);
  const [conversionRateData, setconversionRateData] = useState([]);
  const [topCategoriesData, setTopCategoriesData] = useState([])

  const[growthRateProfitData,setGrowthRateProfitData]=useState([])
  const[growthRateRevenueData,setGrowthRateRevenueData]=useState([])
  
  const [monthlyAnalytics, setMonthlyAnalytics]=useState([])

  const [selectedYear, setSelectedYear] = useState(2025); // Default year is 2025

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const revenueRepoonse = await getRevenueAnalytics({ year: selectedYear });
        const profitRepoonse = await getProfitAnalytics({ year: selectedYear });
        const returnRateRepoonse = await getreturnRatetAnalytics({ year: selectedYear });
        const grossRateRepoonse = await getgrossRateAnalytics({ year: selectedYear });
        const conversionRateRepoonse = await getconversionRateAnalytics({ year: selectedYear });
        const topCategoriesResponse = await getTopCategories({ year: selectedYear });
        const growthRateProfitResponse = await getGrowthRateProfit();
        const growthRateRevenueResponse = await getGrowthRateRevenue();
          // console.log("Topcategories Response:",topCategoriesResponse)
        setRevenueData(revenueRepoonse);
        setProfitData(profitRepoonse);
        setreturnRateData(returnRateRepoonse);  
        setgrossRateData(grossRateRepoonse);
        setconversionRateData(conversionRateRepoonse);
        setTopCategoriesData(topCategoriesResponse);
        setGrowthRateProfitData(growthRateProfitResponse)
        setGrowthRateRevenueData(growthRateRevenueResponse)

        // console.log("Topcategories data:",topCategoriesData)

      } catch (error) {
        console.error('Error fetching revenue analytics:', error);
      }
    };

   
    fetchRevenueData();
    
  }, [selectedYear]); // Fetch data whenever the year changes

  useEffect(()=>{
   const fetchMonthlyAnalytics=async()=>{
      try{
        const currentMonth = new Date().getMonth() + 1;
        const data=await getMonthlyAnalytics(currentMonth);
        setMonthlyAnalytics(data);
      }catch(error){
          console.error('Error fetching monthly analytics:', error);

      }
    }  

    fetchMonthlyAnalytics();
  },[])
  return (
    <DashboardPresentation
        revenueData={revenueData}
        ProfitData={ProfitData}
        returnRateData={returnRateData}
        grossRateData={grossRateData}
        conversionRateData={conversionRateData}
        growthRateProfitData={growthRateProfitData}
        growthRateRevenueData={growthRateRevenueData}
        topCategoriesData={topCategoriesData}
        selectedYear={selectedYear}
        monthlyAnalytics={monthlyAnalytics}
        onYearChange={setSelectedYear} // Pass the year change handler to the presentation
    />
  );
};

export default DashboardContainer;
