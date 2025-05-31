// src/components/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const [email, setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]   = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", email);
      navigate("/employees");
    } catch (err) {
      const apiMsg = err.response?.data?.message || "Login failed.";
      setError(apiMsg);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="message error">{error}</div>}
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
