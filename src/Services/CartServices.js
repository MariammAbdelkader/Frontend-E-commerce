import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index";
const API_BASE_URL = `${apiUrl}/cart`;

export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/preview`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    /*
    
    {
    "message": "Here is your current cart preview",
    "cart": [
        {
            "productId": 2,
            "name": "Budget Device",
            "description": "High quality product.",
            "category": "Crafts & Hobbies",
            "subCategory": "None",
            "quantity": 4,
            "pricePerOneItem": 1280.36
        },
        {
            "productId": 1,
            "name": "Luxury Device",
            "description": "High quality product.",
            "category": "Gaming",
            "subCategory": "None",
            "quantity": 2,
            "pricePerOneItem": 1780.79
        }
    ],
    "totalPrice": "8683.020"
}
    */

    return {
      products: response.data.cart.products,
      totalPrice: response.data.totalPrice,
      totalQuantity: response.data.cart.totalQuantity,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const addTocart = async ({ productId, quantity }) => {
  try {
    console.log(productId, quantity);
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { productId, quantity },
      {
        withCredentials: true,
      }
    );

    return {
      message: response.data.message,
      totalPrice: response.data.cart.totalPrice,
      totalQuantity: response.data.cart.totalQuantity,
    };
  } catch (error) {
    return handleError(error);
  }
};

//Kill cart
export const deletecart = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return { message: response.data.message };
  } catch (error) {
    return handleError(error);
  }
};

export const removeFromCart = async ({ prodcutId, quantity }) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/update`,
      { prodcutId, quantity },
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    /*
        {
    "message": "Product at your cart updated succesfully",
    "cart": {
        "products": [
            {
                "productId": 2,
                "name": "Budget Device",
                "description": "High quality product.",
                "category": "Crafts & Hobbies",
                "subCategory": "None",
                "quantity": 3,
                "pricePerOneItem": 1280.36
            },
            {
                "productId": 1,
                "name": "Luxury Device",
                "description": "High quality product.",
                "category": "Gaming",
                "subCategory": "None",
                "quantity": 2,
                "pricePerOneItem": 1780.79
            }
        ],
        "totalPrice": "7402.660"
    }
}
        */

    return {
      products: response.data.cart,
      totalPrice: response.data.totalPrice,
    };
  } catch (error) {
    return handleError(error);
  }
};
