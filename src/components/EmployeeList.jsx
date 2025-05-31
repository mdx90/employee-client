// src/components/EmployeeList.jsx
import React, { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError]         = useState("");
  const navigate = useNavigate();

  const loadEmployees = async () => {
    setError("");
    try {
      const response = await fetchEmployees();
      setEmployees(response.data);
    } catch (err) {
      // If the token is invalid/expired, 401 => redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
      } else {
        setError("Failed to load employees.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Failed to delete employee.");
    }
  };

  useEffect(() => {
    loadEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Employees</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={handleLogout}
          className="secondary"
          style={{ marginRight: "1rem" }}
        >
          Logout
        </button>
        <button onClick={() => navigate("/employees/new")}>Add Employee</button>
      </div>

      {error && <div className="message error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{new Date(emp.hireDate).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => navigate(`/employees/edit/${emp.id}`)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(emp.id)} className="secondary">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
