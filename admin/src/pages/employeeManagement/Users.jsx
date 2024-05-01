import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom"; 

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
    <div style={{ 
      backgroundImage: `url('../res/bg1.JPEG')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'  
    }}>
      <div className="w-75 bg-secondary rounded p-3">
        <h1 className="mb-0 text-center font-weight-bold text-black">Employee Summary</h1>
        <Link to="/empcreate" className='btn btn-success'>Add Employee</Link> <br></br><br></br>
        <Link to="/login" className='btn btn-success'>login</Link>
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleChange} 
            placeholder="Search by Name, Email, Age, Job Roll"  
            style={{ padding: '10px', marginRight: '5px', width: '400px' }} 
          />
          <button 
            onClick={handleSearch} 
            className='btn btn-primary' 
            style={{ padding: '10px', minWidth: '100px' }} 
          >
            Search
          </button>
        </div>

        <div className="row" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {filteredUsers.map((user, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">Password: {user.password}</p>
                  <p className="card-text">EmpID: {user._id}</p>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Age: {user.age}</p>
                  <p className="card-text">Job Role: {user.jobroll}</p>
                  <p className="card-text">Bank: {user.bank}</p>
                  <p className="card-text">Account Number: {user.accountNumber}</p>

                  <div className="btn-group" role="group">
                    <Link to={`/empupdate/${user._id}`} className='btn btn-success'>Update</Link>
                    <button onClick={() => handleDelete(user._id)} className='btn btn-danger'>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/salaryy" className='btn btn-warning'>Salary</Link>
      </div>
    </div>
  );
}

export default Users;
