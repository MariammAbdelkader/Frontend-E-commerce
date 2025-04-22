import axios from "axios";
import { uploadProductImage } from "./ImageServices"; // adjust path
import {handleError} from "../../utilities/Errorhandling"
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/product`;


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
    return handleError(error)
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
    console.log(API_BASE_URL)
    const response = await axios.get(`${API_BASE_URL}`, filters,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products = response.data.data;

    return products;
  } catch (error) {
    return handleError(error)
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
    return handleError(error)
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
    return handleError(error)
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
    return handleError(error)
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
    return handleError(error)
  }
};
///////////////////////////////Reviews////////////////////////////////////////////////////

const API_BASE_URL_reviews = `${process.env.REACT_APP_API_BASE_URL}/reviews`;

export const getProductReviews = async (productId) => {
  try {
    console.log(" productId.",productId)
    productId = Number(productId);
    if (isNaN(productId)) {
     

      throw new Error("Invalid productId.");
  
    }

    const response = await axios.get(`${API_BASE_URL_reviews}/${productId}`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    console.log(response.data)
    return response.data.reviews;
  } catch (error) {
    return handleError(error)
  }
};
export const getProductRating = async (productId) => {
  try {
    productId = Number(productId);
    if (isNaN(productId)) {
      throw new Error("Invalid productId.");
    }

    const response = await axios.get(`${API_BASE_URL_reviews}/rating${productId}`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return response.data;
  } catch (error) {
    return handleError(error)
  }
};
export const addProductReview = async (productId,review) => {
  try {
    productId = Number(productId);
    if (isNaN(productId)) {
      throw new Error("Invalid productId.");
    }

    const response = await axios.post(`${API_BASE_URL_reviews}/${productId}`, review,{
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};
export const editProductReview = async (reviewId,review) => {
  try {
    reviewId = Number(reviewId);
    if (isNaN(reviewId)) {
      throw new Error("Invalid productId.");
    }

    const response = await axios.put(`${API_BASE_URL_reviews}/${reviewId}`, review,{
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};
export const deleteProductReview = async (reviewId) => {
  try {
    reviewId = Number(reviewId);
    if (isNaN(reviewId)) {
      throw new Error("Invalid productId.");
    }

    const response = await axios.delete(`${API_BASE_URL_reviews}/${reviewId}`,{
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};



///////////////////////////////Categories////////////////////////////////////////////////////

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get/categories`, {
      withCredentials: true,
    });

    return response.data.categories;
  } catch (error) {
    return handleError(error)
  }
};

export const getSubcategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get/subcategories`, {
      withCredentials: true,
    });

    return response.data.subcategories;
  } catch (error) {
    return handleError(error)
  }
};


const API_BASE_URL_cat = `${process.env.REACT_APP_API_BASE_URL}/category`;


export const addCategory = async (name) => {
  try {
  
    const response = await axios.post(`${API_BASE_URL_cat}/add`,{name}, {
      withCredentials: true,
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};

export const editCategory = async (categoryId,name) => {
  try {


    const response = await axios.patch(`${API_BASE_URL_cat}/${categoryId}`,name, {
      withCredentials: true,
    }); 


    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL_cat}/${categoryId}`, {
      withCredentials: true,
    });

    
    console.log(response.data.message)
    return response.data;
  } catch (error) {
    return handleError(error)
  }
};

const API_BASE_URL_subcat = `${process.env.REACT_APP_API_BASE_URL}/subcategory`;


export const addSubCategory = async (data) => {
  try {
    console.log(data)

    const response = await axios.post(`${API_BASE_URL_subcat}/add`,data, {
      withCredentials: true,
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};

export const editSubCategory = async (subcategoryId,data) => {
  try {
   
    const response = await axios.patch(`${API_BASE_URL_subcat}/${subcategoryId}`,data, {
      withCredentials: true,
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};
export const deleteSubCategory = async (subcategoryId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL_subcat}/${subcategoryId}`, {
      withCredentials: true,
    });

    return response.data.message;
  } catch (error) {
    return handleError(error)
  }
};


