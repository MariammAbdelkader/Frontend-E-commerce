import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index"
const API_BASE_URL = `${apiUrl}/return`;


export const requestReturn = async ({orderId, productId,quantity,reason}) => {
  try {
    console.log(orderId, productId,quantity,reason)
    const response = await axios.post(`${API_BASE_URL}/request`,{orderId, productId,quantity,ReturnReason:reason}, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    console.log(response.data)
    return {success:true,message:response.data.message, details:response.data.result};
  } catch (error) {
    return handleError(error);
  }
};


export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orderhistory`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return {details:response.data.data};
  } catch (error) {
    return handleError(error);
  }
};