// src/components/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Register = () => {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]           = useState("");
  const [message, setMessage]       = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(email, password, confirmPassword);
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const apiMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.description ||
        "Registration failed.";
      setError(apiMsg);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <div className="message error">{error}</div>}
      {message && <div className="message success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
