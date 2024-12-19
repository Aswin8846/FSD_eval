import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Correct imports
import EmployeeForm from "./components/EmployeeForm"; // Correct import path
import EmployeeList from "./components/EmployeeList"; // Correct import path

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
