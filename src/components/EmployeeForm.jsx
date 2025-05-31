// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from "react";
import {
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
} from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";

const EmployeeForm = () => {
  const { id }     = useParams();
  const isEdit      = Boolean(id);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    hireDate: new Date().toISOString().split("T")[0], // yyyy-MM-dd
  });
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const loadEmployee = async () => {
    try {
      const response = await fetchEmployeeById(id);
      const data = response.data;
      setEmployee({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        position: data.position,
        hireDate: data.hireDate.split("T")[0], // yyyy-MM-dd
      });
    } catch {
      setError("Failed to load employee.");
    }
  };

  useEffect(() => {
    if (isEdit) loadEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Format hireDate into ISO for API
    const payload = {
      ...employee,
      hireDate: new Date(employee.hireDate).toISOString(),
    };

    try {
      if (isEdit) {
        await updateEmployee(id, { id: parseInt(id), ...payload });
      } else {
        await createEmployee(payload);
      }
      navigate("/employees");
    } catch {
      setError("Failed to save employee.");
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Edit" : "Add"} Employee</h2>
      {error && <div className="message error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
        />

        <label>Hire Date:</label>
        <input
          type="date"
          name="hireDate"
          value={employee.hireDate}
          onChange={handleChange}
          required
        />

        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
