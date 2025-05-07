import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Chart } from 'react-google-charts';

const BarChartPresentation = ({ data, options,selectedMetric,onMetricChange }) => {
  return (
    <Box>
      {/* Selector */}
    <FormControl sx={{ minWidth: 150, mb: 2 }} size="small">
        <InputLabel id="metric-select-label">Metric</InputLabel>
        <Select
          labelId="metric-select-label"
          value={selectedMetric}
          label="Metric"
          onChange={(e) => onMetricChange(e.target.value)}
        >
          <MenuItem value="Profit">Profit</MenuItem>
          <MenuItem value="Revenue">Revenue</MenuItem>
        </Select>
      </FormControl>

      {/* Chart */}
      <Chart
        chartType="Bar"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
    </Box>
  );
};

export default BarChartPresentation;
