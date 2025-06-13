import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem,CardContent,Card } from "@mui/material";
import { Chart } from "react-google-charts";

const BarChartPresentation = ({
  data,
  options,
  selectedMetric,
  onMetricChange,
}) => {
  return (
    <Card sx={{ p: 2, borderRadius: '16px', width: "100%",height:"100%", mb: 3 }}>
      <CardContent>
        <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    {/* Selector */}
                    <FormControl  size="small">
                      <InputLabel id="metric-select-label">Metric</InputLabel>
                      <Select
                        labelId="metric-select-label"
                        value={selectedMetric}
                        label="Metric"
                        onChange={(e) => onMetricChange(e.target.value)}>
                        <MenuItem value="Profit">Profit</MenuItem>
                        <MenuItem value="Revenue">Revenue</MenuItem>
                      </Select>
                    </FormControl>
              </Box>

      {/* Chart */}
      <Chart
        chartType="Bar"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
    </Box>
       </CardContent>
    </Card>
  );
};

export default BarChartPresentation;
