/******************************************  2  ****************************************************/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignUpPage() {
  return (
    <div className="signup-body">
      <Container />
    </div>
  );
}

function Container() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      userRole,
    };

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Sign-up successful!");
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <Form
        handleSubmit={handleSubmit}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setEmail={setEmail}
        email={email}
        password={password}
        setPassword={setPassword}
        error={error}
        setLastName={setLastName}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isSubmitting={isSubmitting}
        userRole={userRole}
        setUserRole={setUserRole}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        address={address}
        setAddress={setAddress}
      />
      <SWitch />
    </div>
  );
}

function Form({
  handleSubmit,
  firstName,
  lastName,
  setEmail,
  email,
  setPassword,
  password,
  confirmPassword,
  error,
  setFirstName,
  setLastName,
  setConfirmPassword,
  isSubmitting,
  userRole,
  setUserRole,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
}) {
  return (
    <div className="form-signup-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: 10 }}>Create Account</h1>

        <InputField
          type="text"
          placeholder="First Name"
          icon="person"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Last Name"
          icon="person"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email Address"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          icon="lock"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="phoneNumber"
          ///TODO icon=
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Address"
          ///TODO icon=
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="select-wrapper">
          <select
            id="userRole"
            value={userRole ? "admin" : "user"}
            onChange={(e) => setUserRole(e.target.value === "admin")}
            required>
            <option value="" disabled selected>
              --- Select ---
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="signup-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "SignUp"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

function SWitch() {
  const navigate = useNavigate();
  return (
    <div className="toggle-signup-container">
      <div className="signup-toggle">
        <div className="signup-toggle-panel">
          <h1>Welcome Back!</h1>
          <p>Enter your Personal details to use all of site features</p>
          <button className="sign-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ type, placeholder, icon, value, onChange }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
        required
      />
      <i class="material-symbols-rounded input-icon">{icon}</i>
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          class="material-symbols-rounded eye-icon">
          {isPasswordShown ? "visibility" : "visibility_off"}
        </i>
      )}
    </div>
  );
}
