import axios from "axios";

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
      withCredentials: true,
    });

    return response.data.data;
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
    const response = await axios.get(`${API_BASE_URL}`, {
      params: filters,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.data;
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
    if (isNaN(productId)) {
      throw new Error("Invalid productId.");
    }

    const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
      withCredentials: true,
    });

    return { success: true, message: "Product deleted successfully." };
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

/**
 * Updates a product by its ID with the new data provided.
 *
 * @param {number} productId - The ID of the product to be updated.
 * @param {object} productData - The new data for the product.
 * @returns {Promise<{ success: boolean, message: string }>} - A success message if the update is successful.
 */
export const editProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${productId}`,
      productData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export const addProduct = async (productData) => {
  try {
    const response = await fetch("http://your-backend-api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.log("Product added successfully");
      return { success: true };
    } else {
      console.error("Failed to add product");
      return { success: false };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false };
  }
};

export const uploadCSV = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASE_URL}/upload-csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "CSV upload failed",
    };
  }
};
