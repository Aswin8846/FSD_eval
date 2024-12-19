// import React, { useState } from "react";
// import axios from "axios";

// const EmployeeForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     employee_id: "",
//     email: "",
//     phone_number: "",
//     department: "HR",
//     date_of_joining: "",
//     role: "",
//   });

//   const [message, setMessage] = useState("");
//   const [employees, setEmployees] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const employeeIdPattern = /^[a-zA-Z0-9]{1,10}$/;
//     if (!employeeIdPattern.test(formData.employee_id)) {
//       setMessage("Employee ID must be alphanumeric and at most 10 characters.");
//       return;
//     }

//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(formData.email)) {
//       setMessage("Please enter a valid email address.");
//       return;
//     }

//     const phonePattern = /^[0-9]{10}$/;
//     if (!phonePattern.test(formData.phone_number)) {
//       setMessage("Phone number must be 10 digits with no special characters.");
//       return;
//     }

//     const currentDate = new Date();
//     const joiningDate = new Date(formData.date_of_joining);
//     if (joiningDate > currentDate) {
//       setMessage("Date of Joining cannot be a future date.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/employees", formData);
//       setMessage("Employee added successfully!");
//       setFormData({
//         name: "",
//         employee_id: "",
//         email: "",
//         phone_number: "",
//         department: "HR",
//         date_of_joining: "",
//         role: "",
//       });
//       fetchEmployees();
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Error adding employee");
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/employees");
//       setEmployees(response.data);
//     } catch (error) {
//       setMessage("Failed to fetch employees");
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//       <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '400px' }}>
//         <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Management System</h1>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Name:</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="First and Last Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Employee ID:</label>
//             <input
//               type="text"
//               name="employee_id"
//               placeholder="Employee ID"
//               value={formData.employee_id}
//               onChange={handleChange}
//               required
//               maxLength={10}
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email:</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Phone Number:</label>
//             <input
//               type="text"
//               name="phone_number"
//               placeholder="Phone Number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Department:</label>
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             >
//               <option>HR</option>
//               <option>Engineering</option>
//               <option>Marketing</option>
//             </select>
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Date of Joining:</label>
//             <input
//               type="date"
//               name="date_of_joining"
//               value={formData.date_of_joining}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Role:</label>
//             <input
//               type="text"
//               name="role"
//               placeholder="Role (e.g. Developer, Manager)"
//               value={formData.role}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//             />
//           </div>

//           <div>
//             <button type="submit" style={{ width: '48%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
//               Submit
//             </button>
//             <button
//               type="reset"
//               onClick={() =>
//                 setFormData({
//                   name: "",
//                   employee_id: "",
//                   email: "",
//                   phone_number: "",
//                   department: "HR",
//                   date_of_joining: "",
//                   role: "",
//                 })
//               }
//               style={{
//                 width: '48%',
//                 padding: '10px',
//                 border: 'none',
//                 borderRadius: '4px',
//                 backgroundColor: '#6c757d',
//                 color: 'white',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//               }}
//             >
//               Reset
//             </button>
//             <button
//               type="button"
//               onClick={fetchEmployees}
//               style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
//             >
//               View Employee List
//             </button>
//           </div>
//         </form>

//         {employees.length > 0 && (
//           <div style={{ marginTop: '20px' }}>
//             <h3 style={{ textAlign: 'center' }}>Employee List</h3>
//             <ul style={{ listStyleType: 'none', padding: '0' }}>
//               {employees.map((employee) => (
//                 <li key={employee.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
//                   <strong>Name:</strong> {employee.name} <br />
//                   <strong>Employee ID:</strong> {employee.employee_id} <br />
//                   <strong>Email:</strong> {employee.email} <br />
//                   <strong>Phone Number:</strong> {employee.phone_number} <br />
//                   <strong>Department:</strong> {employee.department} <br />
//                   <strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()} <br />
//                   <strong>Role:</strong> {employee.role}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Correct import

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    email: "",
    phone_number: "",
    department: "HR",
    date_of_joining: "",
    role: "",
  });

  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeIdPattern = /^[a-zA-Z0-9]{1,10}$/;
    if (!employeeIdPattern.test(formData.employee_id)) {
      setMessage("Employee ID must be alphanumeric and at most 10 characters.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone_number)) {
      setMessage("Phone number must be 10 digits with no special characters.");
      return;
    }

    const currentDate = new Date();
    const joiningDate = new Date(formData.date_of_joining);
    if (joiningDate > currentDate) {
      setMessage("Date of Joining cannot be a future date.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/employees", formData);
      setMessage("Employee added successfully!");
      setFormData({
        name: "",
        employee_id: "",
        email: "",
        phone_number: "",
        department: "HR",
        date_of_joining: "",
        role: "",
      });
      fetchEmployees(); // Fetch employees again to update the list
    } catch (error) {
      setMessage(error.response?.data?.error || "Error adding employee");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      setMessage("Failed to fetch employees");
    }
  };

  const viewEmployeeList = () => {
    navigate("/employees"); // Replace history.push with navigate
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Management System</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="First and Last Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Employee ID:</label>
            <input
              type="text"
              name="employee_id"
              placeholder="Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
              required
              maxLength={10}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            >
              <option>HR</option>
              <option>Engineering</option>
              <option>Marketing</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Date of Joining:</label>
            <input
              type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Role:</label>
            <input
              type="text"
              name="role"
              placeholder="Role (e.g. Developer, Manager)"
              value={formData.role}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          <div>
            <button type="submit" style={{ width: '48%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
              Submit
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  name: "",
                  employee_id: "",
                  email: "",
                  phone_number: "",
                  department: "HR",
                  date_of_joining: "",
                  role: "",
                })
              }
              style={{
                width: '48%',
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#6c757d',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={viewEmployeeList}
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
            >
              View Employee List
            </button>
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EmployeeForm;
