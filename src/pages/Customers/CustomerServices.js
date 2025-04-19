import { FilterRounded } from '@mui/icons-material'
import axios from 'axios'

const baseURL = process.env.API_BASE_URL

export const getAllCustomersInformation=async (filters)=>{
    try{
        const response= await axios.get(`${baseURL}/customermanagement/customer-info`,filters,
            {
                withCredentials: true
            }
        );

        return response.data

    }catch(error){
        return {
            success: false,
            error:
            error.response?.data?.message || // Backend error message
            error.message || // Axios error message
            "Server error. Please try again.", // Fallback message
            };

    }
}

export const getCustomerHistory=async (userId)=>{
    try{
        const response= await axios.get(`${baseURL}/customermanagement/userhistory`,userId,
            {
                withCredentials: true
            }
        );

        return response.data

    }catch(error){
        return {
            success: false,
            error:
            error.response?.data?.message || // Backend error message
            error.message || // Axios error message
            "Server error. Please try again.", // Fallback message
            };

    }
}

export const getCustomerProfile=async ()=>{
    try{
        const response= await axios.get(`${baseURL}/profile`,
            {
                withCredentials: true
            }
        );

        return response.data

    }catch(error){
        return {
            success: false,
            error:
            error.response?.data?.message || // Backend error message
            error.message || // Axios error message
            "Server error. Please try again.", // Fallback message
            };

    }
}