import axios from 'axios';
import {handleError} from '../../utilities/Errorhandling';
import { YoutubeSearchedFor } from '@mui/icons-material';
const API_BASE_URL =`${ process.env.REACT_APP_API_BASE_URL}/sales`;

export const getRevenueAnalytics = async ({year}) => {
    try {
        
        const response = await axios.get(`${API_BASE_URL}/Revenue/${year}` ,{
            withCredentials: true,
        });

        const quarter1 = await getTotalRevenueAnalytics({ year, quarter: 1 });
        const quarter2 = await getTotalRevenueAnalytics({ year, quarter: 2 });
        const quarter3 = await getTotalRevenueAnalytics({ year, quarter: 3 });
        const quarter4 = await getTotalRevenueAnalytics({ year, quarter: 4 });
        const details={
            total:quarter1+quarter2+quarter3+quarter4,
            quarter1:quarter1,
            quarter2:quarter2,
            quarter3:quarter3,
            quarter4:quarter4,  
        }
        response.data.response.details=details;

        return response.data.response;

    } catch (error) {
        return handleError(error);
    }
};

export const getProfitAnalytics = async ({year}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Profit/${year}` ,{
            withCredentials: true,
        });
        const quarter1 = await getTotalProfitAnalytics({ year, quarter: 1 });
        const quarter2 = await getTotalProfitAnalytics({ year, quarter: 2 });   
        const quarter3 = await getTotalProfitAnalytics({ year, quarter: 3 });
        const quarter4 = await getTotalProfitAnalytics({ year, quarter: 4 });
        const details={
            total:quarter1+quarter2+quarter3+quarter4,
            quarter1:quarter1,
            quarter2:quarter2,
            quarter3:quarter3,
            quarter4:quarter4,  
        }
        response.data.response.details=details;

        return response.data.response;
    } catch (error) {
        return handleError(error);
    }
};

export const getreturnRatetAnalytics = async ({year}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/returnRate/${year}` ,{
            withCredentials: true,
        });
        return response.data.response;
    } catch (error) {
        return handleError(error);
    }
};

export const getgrossRateAnalytics = async ({year}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/grossRate/${year}` ,{
            withCredentials: true,
        });
        return response.data.response;
    } catch (error) {
        return handleError(error);
    }
};
export const getconversionRateAnalytics = async ({year}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/conversionRate/${year}` ,{
            withCredentials: true,
        });
        return response.data.response;
    } catch (error) {
        return handleError(error);
    }
};
export const getTopCategories=async ({year,month})=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/topselling/categories/${year}`, {
            params: month?{ month }:{},  
            withCredentials: true,
        });
        return response.data.categories;
    } catch (error) {
        return handleError(error);
    }
}

export const getGrowthRateProfit=async ()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/Profit/growthrate` ,{
            withCredentials: true,
        });
        return response.data.growth;
    } catch (error) {
        return handleError(error);
    }
}
export const getGrowthRateRevenue=async ()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/Revenue/growthrate` ,{
            withCredentials: true,
        });
        return response.data.growth;
    } catch (error) {
        return handleError(error);
    }
}


const getTotalRevenueAnalytics = async ({ year, quarter }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Revenue/sum/${year}`, {
        params: { quarter },  
        withCredentials: true,
      });
      return response.data.total;
    } catch (error) {
      return handleError(error);
    }
};

const getTotalProfitAnalytics = async ({ year, quarter }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Profit/sum/${year}`, {
        params: { quarter },  
        withCredentials: true,
      });
      return response.data.total;
    } catch (error) {
      return handleError(error);
    }
};


