import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function EmpLogin() {
  const [empID, setEmpID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting form...");
    console.log("EmpID:", empID);  // Log empID value
    console.log("Password:", password);  // Log password value
  
    try {
      const response = await axios.get(`http://localhost:4000/User/getEmpuser/${empID}`);
      
      console.log("API response:", response.data);  // Log API response
  
      if (password == response.data.password) {
        navigate(`/emp/${empID}`);
        
      } else {
        console.log("Invalid credentials:", response.data);
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      console.log("API response:", error.response);  // Log the API response
      alert('Error logging in');
    }
  };
  

  console.log("EmpID:", empID);  // Log empID value
  console.log("Password:", password);  // Log password value

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="empID">Employee ID:</label>
          <input
            type="text"
            className="form-control"
            id="empID"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default EmpLogin;
