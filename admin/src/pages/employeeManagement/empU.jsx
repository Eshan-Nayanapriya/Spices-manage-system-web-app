import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function EmpU() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  //const lUser = loggedInUser
  const { id } = useParams();
  //console.log("lsss ", lUser)
  useEffect(() => {
    
      axios.get(`http://localhost:4000/User/getEmpuser/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(" do you want to delete?");
    if (confirmDelete) {
        axios.delete(`http://localhost:4000/User/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user._id !== id));
                setFilteredUsers(filteredUsers.filter(user => user._id !== id)); // Update filteredUsers as well
                navigate('/');
            })
            .catch(err => console.log(err))
    }
  }
  
  return (
    <div className="container mt-5">
      <h2>User Details</h2>
      <div>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Age:</strong> {user?.age}</p>
        <p><strong>Job Role:</strong> {user?.jobroll}</p>
        <p><strong>Bank:</strong> {user?.bank}</p>
        <p><strong>Account Number:</strong> {user?.accountNumber}</p>
        <div className="btn-group" role="group">
                    <Link to={`/update/${id}`} className='btn btn-success'>Update</Link>
                    <button onClick={() => handleDelete(id)} className='btn btn-danger'>Delete</button>
                  </div>
      </div>
      
    </div>
  );
}

export default EmpU;
