import React from "react";
import  BarChartPresentation  from "./BarChartPresentation";
import { useEffect, useState } from "react";

const BarChartContainer = ({Profitdata,Revenuedata}) => {
    const [chartData, setChartData] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState("Profit");
    
    const [options, setOptions] = useState({});
    
useEffect(() => {
    const handleChartData =  (growthData) => {
            try {           
                const googleChartData = [
                    ['Year', 'Quarter Year', 'Half Year', 'Full Year']
                ];
                growthData.forEach(item => {
                    googleChartData.push([
                        String(item.year),
                        item.quarterYear,
                        item.halfYear,
                        item.fullYear
                    ]);
                });
                return googleChartData;
                }catch (error) {
                    console.error('Failed to get data', error);
                }
            };

    
    const BarChartData = async () => {
        try {
            
            let chartData = handleChartData(Profitdata);
            if(selectedMetric == "Revenue") {
                chartData = handleChartData(Revenuedata);
            }

             setChartData(chartData);

            const options = {
                chart: {
                    title: selectedMetric === 'Revenue' ? 'Revenue Growth Rate' : 'Profit Growth Rate'
                }
            };
            setOptions(options)
        } catch (error) {
            console.error('Failed to get data', error);
        }
        };
        
        BarChartData();
    }, [selectedMetric, Profitdata, Revenuedata]);


    

    const handleMetricChange = (metric) => {
        setSelectedMetric(metric);
      };
    
    return <BarChartPresentation 
            data={chartData}
            options={options} 
            selectedMetric={selectedMetric}
            onMetricChange={handleMetricChange}/>
}

export default BarChartContainer;