import axios from "axios";

const API_URL = "http://localhost:3000/signup"; 

const signupServices = async (userData) => {
    try {
        console.log("UserDATA", userData)
        const response = await axios.post(`${API_URL}`, userData);
        return response;
    } 
    
    catch (error) {
        throw error.response?.data?.message || "Signup failed. Try again.";
    }
};

export default  signupServices ;
