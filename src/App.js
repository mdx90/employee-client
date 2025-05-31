// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register      from "./components/Register";
import Login         from "./components/Login";
import EmployeeList  from "./components/EmployeeList";
import EmployeeForm  from "./components/EmployeeForm";
import Navbar        from "./components/Navbar";

const App = () => {
  // Double‐bang ensures a true boolean if a non‐empty string
  const token = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* If already logged in, redirect /login & /register to /employees */}
        <Route path="/register" element={token ? <Navigate to="/employees" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/employees" /> : <Login />} />

        {/* Protected routes */}
        <Route path="/employees" element={token ? <EmployeeList /> : <Navigate to="/login" />} />
        <Route path="/employees/new" element={token ? <EmployeeForm /> : <Navigate to="/login" />} />
        <Route path="/employees/edit/:id" element={token ? <EmployeeForm /> : <Navigate to="/login" />} />

        {/* Catch‐all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
