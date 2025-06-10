import React, { useState, useEffect } from "react";
import {
  getRevenueAnalytics,
  getProfitAnalytics,
  getreturnRatetAnalytics,
  getgrossRateAnalytics,
  getconversionRateAnalytics,
  getTopCategories,
  getGrowthRateProfit,
  getGrowthRateRevenue,
} from "../../../Services/DashboardServices";
import DashboardPresentation from "./DashboardPresentation";

const DashboardContainer = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [ProfitData, setProfitData] = useState([]);
  const [returnRateData, setreturnRateData] = useState([]);
  const [grossRateData, setgrossRateData] = useState([]);
  const [conversionRateData, setconversionRateData] = useState([]);
  const [topCategoriesData, setTopCategoriesData] = useState([]);
  const [growthRateProfitData, setGrowthRateProfitData] = useState([]);
  const [growthRateRevenueData, setGrowthRateRevenueData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const revenueRepoonse = await getRevenueAnalytics({
          year: selectedYear,
        });
        const profitRepoonse = await getProfitAnalytics({ year: selectedYear });
        const returnRateRepoonse = await getreturnRatetAnalytics({
          year: selectedYear,
        });
        const grossRateRepoonse = await getgrossRateAnalytics({
          year: selectedYear,
        });
        const conversionRateRepoonse = await getconversionRateAnalytics({
          year: selectedYear,
        });
        const topCategoriesResponse = await getTopCategories({
          year: selectedYear,
        });
        const growthRateProfitResponse = await getGrowthRateProfit();
        const growthRateRevenueResponse = await getGrowthRateRevenue();

        setRevenueData(revenueRepoonse);
        setProfitData(profitRepoonse);
        setreturnRateData(returnRateRepoonse);
        setgrossRateData(grossRateRepoonse);
        setconversionRateData(conversionRateRepoonse);
        setTopCategoriesData(topCategoriesResponse);
        setGrowthRateProfitData(growthRateProfitResponse);
        setGrowthRateRevenueData(growthRateRevenueResponse);
      } catch (error) {
        console.error("Error fetching revenue analytics:", error);
      }
    };

    fetchRevenueData();
  }, [selectedYear]);

  const charts = [
    {
      title: "Revenue",
      data: revenueData,
      dataKey: "Revenue",
    },
    {
      title: "Profit",
      data: ProfitData,
      dataKey: "Profit",
    },
    {
      title: "Return Rate",
      data: returnRateData,
      dataKey: "returnRate",
    },
    {
      title: "Gross Rate",
      data: grossRateData,
      dataKey: "grossRate",
    },
    {
      title: "Conversion Rate",
      data: conversionRateData,
      dataKey: "conversionRate",
    },
    {
      title: "Top Categories",
      data: topCategoriesData,
      isPieChart: true,
    },
    {
      title: "Growth Rate: Profit vs Revenue",
      profitData: growthRateProfitData,
      revenueData: growthRateRevenueData,
      isBarChart: true,
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % charts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [charts.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? charts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % charts.length);
  };

  return (
    <DashboardPresentation
      revenueData={revenueData}
      ProfitData={ProfitData}
      returnRateData={returnRateData}
      grossRateData={grossRateData}
      conversionRateData={conversionRateData}
      topCategoriesData={topCategoriesData}
      growthRateProfitData={growthRateProfitData}
      growthRateRevenueData={growthRateRevenueData}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
      onYearChange={setSelectedYear}
      currentIndex={currentIndex}
      charts={charts}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />
  );
};

export default DashboardContainer;
