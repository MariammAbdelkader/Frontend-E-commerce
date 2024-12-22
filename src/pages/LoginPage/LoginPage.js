/*******************************   2   ************************************/

import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-body">
      <Container />
    </div>
  );
}

function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // Send POST request to the API
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/upload";
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("There was an error processing your login request.");
    }
  };

  return (
    <div className="container">
      <Form
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        email={email}
        password={password}
        setPassword={setPassword}
        error={error}
      />
      <SWitch />
    </div>
  );
}

function Form({ handleSubmit, setEmail, email, setPassword, password, error }) {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 style={{ marginBottom: 20 }}>Sign In</h1>
        <InputField
          type="email"
          placeholder="Email Address"
          icon="mail"
          setEmail={setEmail}
          value={email}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          setPassword={setPassword}
          value={password}
        />
        <a href="/forget">Forget your password?</a>
        <button className="signin-btn">Sign In</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

function SWitch() {
  const navigate = useNavigate();
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div className="toggle-panel">
          <h1>Hello, Friend!</h1>
          <p>Register with your Personal details to use all of site features</p>
          <button className="register-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ type, placeholder, icon, value, setEmail, setPassword }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleChange = (e) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown && type === "password" ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={handleChange}
        required
      />
      <i className="material-symbols-rounded input-icon">{icon}</i>
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="material-symbols-rounded eye-icon">
          {isPasswordShown ? "visibility" : "visibility_off"}
        </i>
      )}
    </div>
  );
}
