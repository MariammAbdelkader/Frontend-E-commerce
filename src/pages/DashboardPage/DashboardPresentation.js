import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import AnalyticsChart from '../../Components/AnalyticsChart/AnalyticsChartContainer';
import { Pie } from 'recharts';
import PieChartContainer from '../../Components/PieChart/PieChartContainer';
import BarChartContainer from '../../Components/BarChart/BarChartContainer';

const DashboardPresentation = ({
  revenueData,
  ProfitData,
  returnRateData,
  grossRateData,
  conversionRateData,
  topCategoriesData,
  selectedYear,
  onYearChange,
  growthRateProfitData,
  growthRateRevenueData
}) => {

  const years = [2023, 2024, 2025, 2026, 2027, 2028];

  return (
    <Box sx={{ padding: 3, height: '100vh', boxSizing: 'border-box' }}>
      {/* Year Selector */}
      <Box 
            display="flex" 
            justifyContent="flex-end" 
            alignItems="center" 
            sx={{ mb: 3, pr: 2 }}
            >
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                label="Year"
                >
                {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
                </Select>
            </FormControl>
    </Box>

      <Box
        sx={{
          maxHeight: 'calc(100vh - 150px)', // Adjust as needed depending on header height
          overflowY: 'auto',
          paddingRight: 1
        }}
      >
        <AnalyticsChart
          data={revenueData}
          year={selectedYear}
          title="Revenue"
          dataKey="Revenue"
        />
        <AnalyticsChart
          data={ProfitData}
          year={selectedYear}
          title="Profit"
          dataKey="Profit"
        />
        <AnalyticsChart
          data={returnRateData}
          year={selectedYear}
          title="Return Rate"
          dataKey="returnRate"
          yAxisMax={100} 
        
        />
        <AnalyticsChart
          data={grossRateData}
          year={selectedYear}
          title="Monthely Gross Rate"
          dataKey="grossRate"
          yAxisMax={100} 
        />
        <AnalyticsChart
          data={conversionRateData}
          year={selectedYear}
          title="Conversion Rate"
          dataKey="conversionRate"
          yAxisMax={100} 
        />

        <PieChartContainer data={topCategoriesData}/>
        <BarChartContainer Profitdata={growthRateProfitData} Revenuedata={growthRateRevenueData}/>

        <PieChartContainer data={topCategoriesData}/>
        

        </Box>
    </Box>
);
};

export default DashboardPresentation;
