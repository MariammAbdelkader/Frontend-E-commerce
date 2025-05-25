import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index"
import { CloseOutlined } from "@mui/icons-material";
const API_BASE_URL = `${apiUrl}/order`;

export const checkOut= async ({ shippingAddress, billingAddress})=>{
    try{

        const response= await axios.post(`${API_BASE_URL}`,
            { shippingAddress, billingAddress},
            {
             withCredentials: true, // Ensures cookies are sent with the request
        });

        /*
        {
    "status": "success",
    "message": "your order placed well, Please proceed",
    "response": {
        "orderDate": "2025-05-15T08:52:24.796Z",
        "orderId": 21,
        "userId": 1,
        "cartId": 33,
        "totalAmount": 7402.66,
        "shippingAddress": "scd=asd",
        "billingAddress": "scd=asd",
        "paymentStatus": "pending",
        "updatedAt": "2025-05-15T08:52:24.797Z",
        "createdAt": "2025-05-15T08:52:24.797Z",
        "deliveryDate": null
    }
}
        */
       return{message:response.data.message, order:response.data.response}
    }catch(error){
        return handleError(error);
    }
}


export const getAllOrder = async (ordering={}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/all`,{ordering},{
        withCredentials: true, // Ensures cookies are sent with the request
    });


    return response.data.orders;
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