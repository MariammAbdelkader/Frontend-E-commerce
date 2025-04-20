import { FilterRounded } from '@mui/icons-material'
import axios from 'axios'

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

export const getAllCustomersInformation=async (filters)=>{
    try{
        const response= await axios.get(`${API_BASE_URL}/customermanagement/customer-info`,filters,
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
        const response= await axios.get(`${API_BASE_URL}/customermanagement/userhistory`,userId,
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
        const response= await axios.get(`${API_BASE_URL}/profile`,
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