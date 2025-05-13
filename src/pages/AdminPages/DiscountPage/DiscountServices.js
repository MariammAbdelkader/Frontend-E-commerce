import axios from "axios";


const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/discount`;

/**
 * Fetches available product and category discounts from the backend.
 * @async
 * @function ViewDiscounts
 * @returns {Promise<Object>} A promise that resolves to:
 * - `data`: An object containing two arrays:
 *   - `CategoryDiscounts`: Array of discounts applied to product categories.
 *   - `ProductDiscounts`: Array of discounts applied to individual products.
 * - or `error`: An object containing a `success: false` flag and an `error` message
 *   if the request fails due to network issues or server errors.
 *
 * @example
 * const discounts = await ViewDiscounts();
 * if (discounts.success === false) {
 *   console.error(discounts.error);
 * } else {
 *   console.log(discounts.CategoryDiscounts, discounts.ProductDiscounts);
 * }
 */
export const ViewDiscounts=async ()=>{
 try{
  const response = await axios.get(
    `${API_BASE_URL}`,
    {
    withCredentials: true, // Ensures cookies are sent with the request
  });

  return response.data.data;

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
        endDate: to,
      },
      {
        withCredentials: true, // Ensures cookies are sent with the request
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
export const AddDiscountOnCategory = async (
  categoryId,
  percentage,
  from,
  to
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/category`,
      {
        categoryId,
        percentage,
        startDate: from,
        endDate: to,
      },
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );

    const result = response.data.message;
    return result;
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
 * Updates a discount (product or category) by ID.
 *
 * @param {"product" | "category"} type - Type of the discount to update.
 * @param {number} id - ID of the discount to update.
 * @param {Object} updateData - The fields to update (e.g., percentage, startDate, endDate).
 * @returns {Promise<Object>} - Result of the update operation.
 *
 * @example
 * const result = await updateDiscount("product", 5, { percentage: 30 });
 * if (result.success) {
 *   console.log(result.message);
 * } else {
 *   console.error(result.error);
 * }
 */
export const updateDiscount = async (type, id, updateData) => {
  try {
    const endpoint =
      type === "product"
        ? `${API_BASE_URL}/product/${id}`
        : `${API_BASE_URL}/category/${id}`;

    const response = await axios.patch(endpoint, updateData, {
      withCredentials: true, 
    });

    console.log('API response:', response);  // Log the API response
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error in updateDiscount:", error);  // Log errors
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to update the discount.",
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
export const removeDiscountOnProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/product/${productId}`, 
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    const result = response.data;
    return result;
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
export const removeDiscountOnCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/category/${categoryId}`, 
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    const result = response.data;
    return result;
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







/*************************************************************************************
 * 
 * 
 *  fareed
 * 
 * 
 * 
 * 
 * 
 * 
 */
export const addDiscount = async (discountRate, category) => {
  const discountData = { discountRate, category };
  try {
    const response = await fetch("/api/add-discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discountData),
    });

    if (!response.ok) {
      throw new Error("Failed to apply discount");
    }

    return "Discount applied successfully";
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error applying discount");
  }
};

export const applyProductDiscount = async (
  productCode,
  productDiscountRate
) => {
  const productDiscountData = { productCode, productDiscountRate };
  try {
    const response = await fetch("/api/apply-product-discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDiscountData),
    });

    if (!response.ok) {
      throw new Error("Failed to apply product discount");
    }

    return "Product discount applied successfully";
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error applying product discount");
  }
};
