
import axios from "axios";
const API_BASE_URL=`http://localhost:3000/image` 

export const uploadProductImage = async (imageFile, productId) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.post(`${API_BASE_URL}/upload/${productId}`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });
        return response.data; // or return just success message if you want
    } catch (error) {
        throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Image upload failed"
        );
    }
};


export const deleteProductImage = async (imageId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${imageId}`, {
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete image"
        );
    }
};


export const replaceProductImage = async (imageFile, imageId) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.put(`${API_BASE_URL}/replace/${imageId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Failed to replace image"
        );
    }
};

export const getAllProductImages = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${productId}`, {
        withCredentials: true,
        });
        return response.data.data; // contains { productId, images: [...] }
    } catch (error) {
        throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch product images"
        );
    }
};