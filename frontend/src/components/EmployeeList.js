import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Correct import

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data);
      } catch (error) {
        setMessage("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '600px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee List</h1>
        
        {employees.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {employees.map((employee) => (
              <li key={employee.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <strong>Name:</strong> {employee.name} <br />
                <strong>Employee ID:</strong> {employee.employee_id} <br />
                <strong>Email:</strong> {employee.email} <br />
                <strong>Phone Number:</strong> {employee.phone_number} <br />
                <strong>Department:</strong> {employee.department} <br />
                <strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()} <br />
                <strong>Role:</strong> {employee.role}
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found</p>
        )}

        {message && <p>{message}</p>}
        <button
          onClick={() => navigate("/")} // Replace history.push with navigate
          style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
        >
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
