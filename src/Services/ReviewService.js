import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index"
const API_BASE_URL = `${apiUrl}/reviews`;


export const addReview = async ({productId,rate,comment}) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/${productId}`,{rating:rate,comment}, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return {success:true,message:response.data.message};
  } catch (error) {
    return handleError(error);
  }
};
