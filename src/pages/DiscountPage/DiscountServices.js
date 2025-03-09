import axios from "axios";

const API_BASE_URL = "http://localhost:3000/discount";

/**
 * Sends a request to add a discount to a product.
 * 
 * @param {number} productId - The ID of the product to apply the discount to.
 * @param {number} percentage - The discount percentage (0-100).
 * @param {string} from - The start date of the discount (YYYY-MM-DD).
 * @param {string} to - The end date of the discount (YYYY-MM-DD).
 * @returns {Promise<{ message: string } | { success: false, error: string }>} 
 * - Returns a success message if the discount is applied successfully, or an error object if the request fails.
 */
export const AddDiscountOnProduct = async (productId, percentage, from, to) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/product`, 
            { 
                productId, 
                percentage, 
                startDate: from, 
                endDate: to 
            },
            {
                withCredentials: true // Ensures cookies are sent with the request
            }
        );

        return response.data.message;

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

/**
 * Sends a request to apply a discount to a category of products.
 * 
 * @param {number} categoryId - The ID of the category to apply the discount to.
 * @param {number} percentage - The discount percentage to be applied.
 * @param {string} from - The start date of the discount in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ).
 * @param {string} to - The end date of the discount in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ).
 * @returns {Promise<string | { success: false, error: string }>} - 
 *          A success message if the request is successful, 
 *          or an error object if the request fails.
 */
export const AddDiscountOnCategory = async(categoryId, percentage, from, to)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/category`, {
                categoryId,
                percentage, 
                startDate: from, 
                endDate: to
        },{
            withCredentials: true // Ensures cookies are sent with the request
        });

        const result =response.data.message;
        return result;

    }catch(error){
        return {
            success: false,
            error:
              error.response?.data?.message || // Backend error message
              error.message || // Axios error message
              "Server error. Please try again.", // Fallback message
        };
    }
};


/**
 * remove discount form product.
 * 
 * @param {number} [discountData.productId] 
 * @returns {Promise<{ 
*   message: string, 
*   product:{
*     productId: number,
*     name: string,
*     description: string,
*     category: string,
*     subcategory: string,
*     price: number,
*     discountPrice: number,
*     status: string
*   }
* } | { success: false, error: string }>} - The response containing a success message and the updated product, or an error message if the request fails.
*/
export const removeDiscountOnProduct = async(productId)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/remove/product`, productId,{
            withCredentials: true // Ensures cookies are sent with the request
        });
        const result =response.data;
        return result;

    }catch(error){
        return {
            success: false,
            error:
              error.response?.data?.message || // Backend error message
              error.message || // Axios error message
              "Server error. Please try again.", // Fallback message
        };
    }
};


/*
 * remove discount form a category.
 * 
 * @param {number} [discountData.percentage]
 * @returns {Promise<{ 
*   message: string, 
*   Array<{
*     productId: number,
*     name: string,
*     description: string,
*     category: string,
*     subcategory: string,
*     price: number,
*     discountPrice: number,
*     status: string
*   }> 
* } | { success: false, error: string }>} - The response containing a success message and the updated product, or an error message if the request fails.
*/
export const removeDiscountOnCategory = async(categoryId)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/remove/category`, categoryId,{
            withCredentials: true // Ensures cookies are sent with the request
        });
        const result =response.data;
        return result;

    }catch(error){
        return {
            success: false,
            error:
              error.response?.data?.message || // Backend error message
              error.message || // Axios error message
              "Server error. Please try again.", // Fallback message
        };
    }
};


