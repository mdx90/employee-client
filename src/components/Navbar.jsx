// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav>
      {token && userEmail ? (
        <>
          <span className="username">Welcome, {userEmail}</span>
          <Link to="/employees">Employees</Link>
          <button
            onClick={handleLogout}
            style={{ marginLeft: "1rem", background: "#cc0000" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
