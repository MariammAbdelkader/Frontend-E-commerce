import axios from "axios";
import { uploadProductImage } from "./ImageServices"; // adjust path
const API_BASE_URL = "http://localhost:3000/product";

/**
 * Fetches a product by its ID, including its category, subcategory,
 * and applicable discount percentages.
 *
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<{
 *   productId: number,
 *   name: string,
 *   description: string,
 *   category: string | null,
 *   subcategory: string | null,
 *   price: number,
 *   discountprice: number | null,
 *   status: string,
 *   productDiscountPercentage: number | null,
 *   categoryDiscountPercentage: number | null
 * } | { success: false, error: string }>} - The product data or an error object.
 */
export const getProductById = async (productId) => {
  try {
    productId = Number(productId);
    if (isNaN(productId)) {
      throw new Error("Invalid productId.");
    }

    const response = await axios.get(`${API_BASE_URL}/${productId}`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return response.data.data;
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
 * Retrieves a list of products based on provided filters.
 *
 * @param {object} filters - An object containing optional filter parameters:
 * @param {string} [filters.category] - The product category.
 * @param {string} [filters.subcategory] - The product subcategory.
 * @param {number} [filters.price_lt] - Maximum price threshold.
 *
 * @returns {Promise<{
 *     Array<{
 *   productId: number,
 *   name: string,
 *   description: string,
 *   category: string | null,
 *   subcategory: string | null,
 *   price: number,
 *   discountprice: number | null,
 *   status: string,
 *   productDiscountPercentage: number | null,
 *   categoryDiscountPercentage: number | null
 *   }>
 * } | { success: false, error: string }>} - Returns product data if successful, otherwise an error object.
 */

export const getAllProducts = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, filters,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products = response.data.data;

    return products;
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
 * Deletes a product by its ID.
 *
 * @param {number} productId - The ID of the product to be deleted.
 * @returns {Promise<{ message: string }>} - A confirmation message upon successful deletion.
 * @throws {Error} - Throws an error if the product ID is missing, invalid, not found, or deletion fails.
 */
export const deleteProduct = async (productId) => {
  try {
    productId = Number(productId);
    if (typeof productId !== "number") {
      throw new Error("Invalid productId.");
    }
    await axios.delete(`${API_BASE_URL}/${productId}`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });
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

export const addProduct = async (productData) => {
  try {       
        
        console.log("Submitting productData:", productData);
    
        const { image, ...rest } = productData;
        console.log("rest productData:", rest);
        // 1. Send data (except image)
        const response = await axios.post(`${API_BASE_URL}/create`, rest, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        },
        );
    
        const productId = response.data?.newProduct?.productId;
    
        if (!productId) {
          throw new Error("Product ID not returned from create endpoint");
        }
        if(image)
          {
            await uploadProductImage(image, productId);
          }
    return response.data.success;
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

export const uploadCSV = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`http://localhost:3000/upload/csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

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

export const editProduct = async (productId, productData) => {
  try {
    await axios.put(`${API_BASE_URL}/${productId}`, productData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: "Product updated successfully." };
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

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get/categories`, {
      withCredentials: true,
    });

    return response.data.categories;
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

export const getSubcategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get/subcategories`, {
      withCredentials: true,
    });

    return response.data.subcategories;
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
