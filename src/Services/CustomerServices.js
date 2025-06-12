import axios from "axios";

import apiUrl from "../config/index";
const API_BASE_URL = `${apiUrl}`;

export const getAllCustomersInformation = async ({type}) => {

  console.log("Fetching customers with type:", type);
  try {
    const response = await axios.post(`${API_BASE_URL}/customermanagement/customer-info`,
      {type},
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data.segmenteedUsers,
    };
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

export const getCustomerHistory = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/customermanagement/userhistory/${userId}`, // ✅ Append to path
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Server error. Please try again.",
    };
  }
};

export const getCustomerProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      withCredentials: true,
    });

    return {success:true,profile :response.data.profile};
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
