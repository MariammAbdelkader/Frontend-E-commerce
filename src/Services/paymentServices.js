import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index"
const API_BASE_URL = `${apiUrl}`;

export const paymob =async ({orderId})=>{

    try{
        const response= axios.post(`${API_BASE_URL}/paymob`,
            {orderId},
            {
                withCredentials:true,
            }
        )

        return({paymentUrl:response.data.paymentUrl})

    }catch(error){
        return handleError(error);
    }
}