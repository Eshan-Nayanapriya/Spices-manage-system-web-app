import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export default function AddMachanic() {
  const history = useNavigate();
  const [inputs, setMachanicInput] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setMachanicInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate phone number length
    if (inputs.phone.length !== 10) {
      alert('Phone number must be 10 digits long.');
      return; // Exit the function if validation fails
    }
    
    console.log(inputs);
    sendRequest().then(() => history('/machineDetails'));
  };
  
  

  const sendRequest = async () => {
    await axios
      .post('http://localhost:4000/machanics', {
        name: String(inputs.name),
        age: String(inputs.age),
        phone: String(inputs.phone),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <center>
        <h1>ADD MACHANIC</h1>
      </center>

      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '300px',
            margin: '0 auto',
            backgroundColor: '#C1F5E9',
            borderRadius: '5px',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              style={{
                width: '90%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
            <input
              type="text"
              name="age"
              onChange={handleChange}
              value={inputs.age}
              style={{
                width: '90%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={inputs.phone}
              style={{
                width: '90%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Address:</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              style={{
                width: '90%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              required
            />
          </div>
          <button
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
//