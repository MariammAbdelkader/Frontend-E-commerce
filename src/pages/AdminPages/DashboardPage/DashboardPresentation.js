import React from "react";
import { FormControl,Grid, Typography,InputLabel, Select,IconButton, MenuItem, Box } from "@mui/material";
import AnalyticsChart from "../../../Components/AnalyticsChart/AnalyticsChartContainer";
import PieChartContainer from "../../../Components/PieChart/PieChartContainer";
import BarChartContainer from "../../../Components/BarChart/BarChartContainer";
import styles, { pieColors } from "./DashboardStyles";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";


const StatCard = ({ value, title, growth, color, icon }) => (
  <Box sx={styles.statCard(color)}>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h5" sx={styles.statCardValue(color)}>
        {value}
      </Typography>
      {icon}
    </Box>
    <Typography sx={styles.statCardTitle}>{title}</Typography>
   <Typography sx={styles.statCardGrowthText}>
      {Number(growth) === 0 ? (
        <span
          style={{
            ...styles.statCardGrowthHighlight,
            color: "gray",
          }}
        >
          ➖ same as previous month
        </span>
      ) : (
        <>
          <span
            style={{
              ...styles.statCardGrowthHighlight,
              color: growth > 0 ? "green" : "red",
            }}
          >
            {growth > 0 ? "▲" : "▼"} {Math.abs(growth)}%
          </span>{" "}
          {growth > 0 ? "higher" : "lower"} than last month
    </>
  )}
</Typography>

  </Box>
);


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
  growthRateRevenueData,
  monthlyAnalytics
}) => {
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  return (
    
  <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    padding: 3,
    boxSizing: "border-box",
    overflow: "hidden",
  }}
>


  <Box
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    sx={{ mb: 1, pr: 2 }}
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
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  </Box>

  {/* Statistics or other stuff */}
  {/* <Box sx={styles.statsWrapper}></Box> */}


   <Box
  sx={{
   flexGrow: 1,
      overflowY: "auto",
      paddingRight: 1,
  }}
>
  <Grid container spacing={6}>
    <Grid item xs={12}>
       <Box sx={styles.statsWrapper}>
        <StatCard
          value={monthlyAnalytics.Revenue}
          title="Total Revenue"
          growth={monthlyAnalytics.revenueChange  ||0}
          icon={<AttachMoneyIcon sx={{ color: "#1b0099" }} />}
          color="#1b0099"
        />
        <StatCard
          value={monthlyAnalytics.Profit}
          title="Total Profit"
          growth={monthlyAnalytics.profitChange || 0}
          icon={<ShoppingCartIcon sx={{ color: "#00bcd4" }} />}
          color="#00bcd4"
        />
        <StatCard
          value={monthlyAnalytics.returnRate}
          title="Avg Return Rate"
          growth={monthlyAnalytics.returnRateChange || 0}
          icon={<GroupIcon sx={{ color: "#f06292" }} />}
          color="#f06292"
        />
        <StatCard
          value={monthlyAnalytics.conversionRate}
          title="Avg Conversion Rate"
          growth={monthlyAnalytics.conversionRateChange || 0}
          icon={<VisibilityIcon sx={{ color: "#9575cd" }} />}
          color="#9575cd"
        />
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <AnalyticsChart
        data={revenueData}
        year={selectedYear}
        title="Revenue"
        dataKey="Revenue"
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <AnalyticsChart
        data={ProfitData}
        year={selectedYear}
        title="Profit"
        dataKey="Profit"
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <AnalyticsChart
        data={returnRateData}
        year={selectedYear}
        title="Return Rate"
        dataKey="returnRate"
        yAxisMax={100}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <AnalyticsChart
        data={grossRateData}
        year={selectedYear}
        title="Monthly Gross Rate"
        dataKey="grossRate"
        yAxisMax={100}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <AnalyticsChart
        data={conversionRateData}
        year={selectedYear}
        title="Conversion Rate"
        dataKey="conversionRate"
        yAxisMax={100}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <PieChartContainer data={topCategoriesData} />
    </Grid>

    <Grid item xs={12} md={6}>
      <BarChartContainer
        Profitdata={growthRateProfitData}
        Revenuedata={growthRateRevenueData}
      />
    </Grid>
  </Grid>

  
</Box>
</Box>

  );
};

export default DashboardPresentation;
