
import axios from "axios";
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/order`;

export const getAllOrder = async (filters) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`,filters ,{
        withCredentials: true, // Ensures cookies are sent with the request
    });

    return response.data.Orders;
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || // Backend error message
          error.message || // Axios error message
          "Server error. Please try again.", // Fallback message
        };
    }
};