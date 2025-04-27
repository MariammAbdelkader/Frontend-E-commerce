import React from 'react';
import { Card, CardContent, Typography, Select, MenuItem,FormControl } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsChartView = ({ title, chartData, details, selectedQuarter, onChangeQuarter,isSummableMetric }) => {
  return (
    <Card sx={{ p: 2, borderRadius: '16px', width: "60%", mb: 3 }}>
      <CardContent>

        {/* Title and Quarter Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          {/* 👇 Select dropdown */}
          {isSummableMetric && (
            <FormControl size="small">
              <Select
                value={selectedQuarter}
                onChange={(e) => onChangeQuarter(e.target.value)}
              >
                <MenuItem value="total">Total</MenuItem>
                <MenuItem value="quarter1">Q1</MenuItem>
                <MenuItem value="quarter2">Q2</MenuItem>
                <MenuItem value="quarter3">Q3</MenuItem>
                <MenuItem value="quarter4">Q4</MenuItem>
              </Select>
            </FormControl>
          )}

        </div>

        {/* Display selected value */}
        {isSummableMetric &&(
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
          Value: {details[selectedQuarter]?.toFixed(2) ?? 'N/A'}
        </Typography>)}

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={0} />
            <YAxis />
            <Tooltip />
            <Line type="linear" dataKey="value" stroke="#1976d2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
};

export default AnalyticsChartView;
