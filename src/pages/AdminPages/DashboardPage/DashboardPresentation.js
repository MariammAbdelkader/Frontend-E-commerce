import React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import styles, { pieColors } from "./DashboardStyles";

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
      <span style={styles.statCardGrowthHighlight}>+{growth}%</span> higher than
      last month
    </Typography>
  </Box>
);

const ChartCard = ({ title, children }) => (
  <Paper elevation={3} sx={styles.chartCard}>
    <Typography variant="h6" sx={styles.chartCardTitle}>
      {title}
    </Typography>
    {children}
  </Paper>
);

const LineChartComponent = ({ data, dataKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke="#1b0099"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
);

const PieChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent, index }) => {
          const color = pieColors[index % pieColors.length];
          return (
            <text
              x={120}
              y={30 + index * 25}
              {...styles.pieChartLabelTextProps(color)}
              style={styles.pieChartLabel}>
              {name} ({(percent * 100).toFixed(0)}%)
            </text>
          );
        }}>
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={pieColors[index % pieColors.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

const BarChartComponent = ({ profitData, revenueData }) => {
  const combined = profitData.map((item, i) => ({
    date: item.date,
    Profit: item.Profit,
    Revenue: revenueData[i]?.Revenue || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={combined}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Profit" fill="#6200ee" />
        <Bar dataKey="Revenue" fill="#ff4081" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const DashboardPresentation = ({
  revenueData,
  ProfitData,
  returnRateData,
  conversionRateData,
  growthRateProfitData,
  growthRateRevenueData,
  currentIndex,
  selectedYear,
  setSelectedYear,
  charts,
  handlePrev,
  handleNext,
}) => {
  const totalRevenue = revenueData.reduce((acc, cur) => acc + cur.Revenue, 0);
  const totalProfit = ProfitData.reduce((acc, cur) => acc + cur.Profit, 0);
  const avgReturnRate =
    returnRateData.reduce((acc, cur) => acc + cur.returnRate, 0) /
    (returnRateData.length || 1);
  const avgConversionRate =
    conversionRateData.reduce((acc, cur) => acc + cur.conversionRate, 0) /
    (conversionRateData.length || 1);

  const currentChart = charts[currentIndex];

  let chartContent;
  if (currentChart.isPieChart) {
    chartContent = <PieChartComponent data={currentChart.data} />;
  } else if (currentChart.isBarChart) {
    chartContent = (
      <BarChartComponent
        profitData={currentChart.profitData}
        revenueData={currentChart.revenueData}
      />
    );
  } else {
    chartContent = (
      <LineChartComponent
        data={currentChart.data}
        dataKey={currentChart.dataKey}
      />
    );
  }

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.statsWrapper}>
        <StatCard
          value={`$${totalRevenue.toLocaleString()}`}
          title="Total Revenue"
          growth={growthRateRevenueData?.at(-1)?.Revenue || 0}
          icon={<AttachMoneyIcon sx={{ color: "#1b0099" }} />}
          color="#1b0099"
        />
        <StatCard
          value={`$${totalProfit.toLocaleString()}`}
          title="Total Profit"
          growth={growthRateProfitData?.at(-1)?.Profit || 0}
          icon={<ShoppingCartIcon sx={{ color: "#00bcd4" }} />}
          color="#00bcd4"
        />
        <StatCard
          value={`${avgReturnRate.toFixed(2)}%`}
          title="Avg Return Rate"
          growth={94}
          icon={<GroupIcon sx={{ color: "#f06292" }} />}
          color="#f06292"
        />
        <StatCard
          value={`${avgConversionRate.toFixed(2)}%`}
          title="Avg Conversion Rate"
          growth={68}
          icon={<VisibilityIcon sx={{ color: "#9575cd" }} />}
          color="#9575cd"
        />
      </Box>

      <Box sx={styles.chartsWrapper}>
        <IconButton
          onClick={handlePrev}
          sx={styles.iconButtonPrev}
          aria-label="previous">
          <ArrowBackIosNewIcon />
        </IconButton>

        <ChartCard title={currentChart.title}>
          <FormControl sx={{ minWidth: 120, ml: "950px", mb: 2 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}>
              {[2023, 2024, 2025, 2026, 2027].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {chartContent}
        </ChartCard>

        <IconButton
          onClick={handleNext}
          sx={styles.iconButtonNext}
          aria-label="next">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DashboardPresentation;
