import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index"
const API_BASE_URL = `${apiUrl}/payment`;

export const paymob =async ({orderId})=>{

    try{
        const response= await axios.post(`${API_BASE_URL}/paymob`,
            {orderId},
            {
                withCredentials:true,
            }
        )

        return({success:true,paymentUrl:response.data.paymentUrl})

    }catch(error){
        return handleError(error);
    }
}