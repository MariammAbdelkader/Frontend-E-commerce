import axios from "axios";

const API_BASE_URL = "http://localhost:3000/product";

/**
 * Fetches a product by its ID.
 * 
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<{ 
*   productId: number, 
*   name: string, 
*   description: string, 
*   category: string, 
*   subcategory: string, 
*   price: number, 
*   discountPrice: number, 
*   status: string 
* } | { success: false, error: string }>} - The product data or an error object.
*/
export const getProductById= async (productId)=>{
    try{

        productId = Number(productId);
        if (typeof productId !== "number") {
        throw new Error("Invalid productId.");
        }
        const response = await axios.get(`${API_BASE_URL}/${productId}`, {
            withCredentials: true // Ensures cookies are sent with the request
        });
        const product =response.data.data;
        return product;

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


/**
 * Retrieves a list of products based on provided filters.
 * 
 * @param {object} filters - An object containing optional filter parameters:
 * @param {string} [filters.category] - The product category.
 * @param {string} [filters.subcategory] - The product subcategory.
 * @param {number} [filters.price_lt] - Maximum price threshold.
 * 
 * @returns {Promise<{
*     Array<{
*     productId: number,
*     name: string,
*     description: string,
*     category: string,
*     subcategory: string,
*     price: number,
*     discountPrice: number,
*     status: string
*   }>
* } | { success: false, error: string }>} - Returns product data if successful, otherwise an error object.
*/

export const getAllProducts =async (filters)=>{
    try{
       

        const response = await axios.get(`${API_BASE_URL}`, filters,{
            withCredentials: true ,
            headers: {
                "Content-Type": "application/json",
            },
        });
        const products =response.data.data;

        return products;

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


/**
 * Deletes a product by its ID.
 *
 * @param {number} productId - The ID of the product to be deleted.
 * @returns {Promise<{ message: string }>} - A confirmation message upon successful deletion.
 * @throws {Error} - Throws an error if the product ID is missing, invalid, not found, or deletion fails.
 */
export const deleteProduct=async (productId)=>{
    try{
        productId = Number(productId);
        if (typeof productId !== "number") {
        throw new Error("Invalid productId.");
        }
        const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
            withCredentials: true // Ensures cookies are sent with the request
        });
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





