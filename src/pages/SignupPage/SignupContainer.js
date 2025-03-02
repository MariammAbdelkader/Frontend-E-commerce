import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./SignupServices";

const SignupContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};

    if (!firstName.trim()) tempErrors.firstName = "First Name is required";
    if (!lastName.trim()) tempErrors.lastName = "Last Name is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      tempErrors.email = "Invalid email format";

    if (!password.trim()) tempErrors.password = "Password is required";
    if (!confirmPassword.trim())
      tempErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const userData = { firstName, lastName, email, password };

    const response = await signupUser(userData);

    if (response.success) {
      console.log("Signup successful:", response.data);
      navigate("/dashboard");
    } else {
      setErrors({ apiError: response.data?.message || response.error });
    }

    setLoading(false);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return {
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    handleSignup,
    handleSignIn,
    loading,
  };
};

export default SignupContainer;
