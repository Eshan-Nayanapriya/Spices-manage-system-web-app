import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function EmpU() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
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
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      axios.delete(`http://localhost:4000/User/deleteUser/${id}`)
        .then(res => {
          console.log(res);
          navigate('/emplogin');
        })
        .catch(err => console.log(err))
    }
  }
  
  return (
    <div style={{ marginTop: '50px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center' , width: '100%',height:'100%'}}>
      <div className="card" style={{ margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="card-title" style={{ color: '#333', fontWeight: 'bold', marginBottom: '20px' }}>User Details</h2>
          <p className="card-text"><strong>Name:</strong> {user?.name}</p>
          <p className="card-text"><strong>Email:</strong> {user?.email}</p>
          <p className="card-text"><strong>Age:</strong> {user?.age}</p>
          <p className="card-text"><strong>Job Role:</strong> {user?.jobroll}</p>
          <p className="card-text"><strong>Bank:</strong> {user?.bank}</p>
          <p className="card-text"><strong>Account Number:</strong> {user?.accountNumber}</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <button onClick={() => handleDelete(id)} style={{ padding: '10px 20px', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#fff' }}>Delete</button>
          </div>
          <p className="card-text" style={{ color: '#333', fontWeight: 'bold' }}>Email us with your emp ID and name if you want to update: sahanadmin@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default EmpU;
