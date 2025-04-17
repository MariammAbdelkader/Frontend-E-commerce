
import axios from "axios";
const baseURL = process.env.API_BASE_URL

export const getAllOrder = async (filters) => {
    try {
        const response = await axios.get(`${baseURL}/order/all`,filters ,{
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