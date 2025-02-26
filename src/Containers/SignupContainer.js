import { useState } from "react";
import SignupPage from "../Components/Pages/SignupPage";
import  signupServices  from "../Services/SignupServices";


const SignupContainer = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        Gender: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if all fields are filled
        const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword", "phoneNumber", "address", "Gender"];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
        if (emptyFields.length > 0) {
            setError(`Please fill in all required fields: ${emptyFields.join(", ")}`);
            return;
        }
    
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatch(true);
            setError("Passwords do not match!");
            return;
        }
        setPasswordMismatch(false);
        setError("");
    
        setLoading(true);
        setSuccess(false);
    
        try {
            const response = await signupServices(formData);
            console.log(response);/////////////////////////////////////////////////////////////////////////////////////////
            setSuccess(true);
        } catch (err) {
            setError(err.message || "Signup failed!");
        } finally {
            setLoading(false);
        }
    };
    

    return (
    <SignupPage
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
        passwordMismatch={passwordMismatch}
    />
    );
    };

export default SignupContainer;
