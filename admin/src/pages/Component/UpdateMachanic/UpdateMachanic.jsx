import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

function UpdateMachanic() {
  const [inputs, setMachanicInput] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/machanics/${id}`)
        .then((res) => res.data)
        .then((data) => setMachanicInput(data.machanic));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:4000/machanics/${id}`, {
      name: String(inputs.name),
      age: String(inputs.age),
      phone: String(inputs.phone),
      address: String(inputs.address)
    });
  };

  const handleChange = (e) => {
    setMachanicInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/machineDetails");
  };

  return (
    <div>
      <h1>Update Machanic</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input type='text' name="name" onChange={handleChange} value={inputs.name || ''} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
          <input type='text' name="age" onChange={handleChange} value={inputs.age || ''} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
          <input  type='text' name="phone" onChange={handleChange} value={'0'+inputs.phone || ''} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Address:</label>
          <input type='text' name="address" onChange={handleChange} value={inputs.address || ''} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Submit</button>
      </form>
    </div>
  );
}

export default UpdateMachanic;
