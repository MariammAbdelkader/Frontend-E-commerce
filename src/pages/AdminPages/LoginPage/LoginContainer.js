import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../Services/LoginServices";

const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const response = await loginUser({ email, password });

    if (response.success) {
      if(response.data.role==="Customer")
          navigate("/store");
      else if(response.data.role==="Admin")
          navigate("/main");

    } else {
      setErrors((prev) => ({
        ...prev,
        apiError: response.data?.message || response.error,
      }));
    }

    setLoading(false);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return {
    showPassword,
    handleTogglePassword,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleLogin,
    handleSignUp,
    loading,
  };
};

export default LoginContainer;
