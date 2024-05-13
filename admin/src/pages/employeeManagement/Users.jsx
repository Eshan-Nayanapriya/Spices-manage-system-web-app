import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom"; 
import '../employeeManagement/emp.css'



function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:4000/User/users')  
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Set filteredUsers initially with all users
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Make sure the update employee termination table before delete, do you want to delete?");
    if (confirmDelete) {
        axios.delete(`http://localhost:4000/User/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user._id !== id));
                setFilteredUsers(filteredUsers.filter(user => user._id !== id)); 
            })
            .catch(err => console.log(err))
    }
  }

  const handleSearch = () => {
    const newFilteredUsers = users.filter(user => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.age.toString().includes(searchTerm.toLowerCase()) ||
        user.jobroll.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bank.toString().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(newFilteredUsers);
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredUsers(users); 
    } else {
      handleSearch(); 
    }
  }

  return (
    <div className="employee-summary-container">
    <div className="employee-summary-content">
      <h1 className="employee-summary-heading">Employee Summary</h1>
      <Link to="/empcreate" className='btn btn-success'style={{ 
                                            marginRight: '10px', 
                                            padding: '5px 10px', 
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }}>Add Employee</Link>
      <Link to="/emplogin" className='btn btn-success'style={{ 
                                            marginRight: '10px', 
                                            padding: '5px 10px', 
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }}>Login</Link>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search by Name, Email, Age, Job Role"
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className='search-btn'
        >
          Search
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>EmpID</th>
            <th>Email</th>
            <th>Age</th>
            <th>Job Role</th>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.password}</td>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.jobroll}</td>
              <td>{user.bank}</td>
              <td>{user.accountNumber}</td>
              <td>
                <Link to={`/empupdate/${user._id}`} className='btn btn-success' style={{ 
                                            marginRight: '10px', 
                                            padding: '5px 10px', 
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }}>Update</Link>
                <button onClick={() => handleDelete(user._id)} className='btn btn-danger'style={{ 
                                            padding: '5px 10px', 
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br></br>
      <Link to="/salaryy" className='btn btn-warning'style={{ 
                                            padding: '5px 10px', 
                                            backgroundColor: '#FF8C00',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }}>Salary</Link>
    </div>
  </div>
  );
}

export default Users;
