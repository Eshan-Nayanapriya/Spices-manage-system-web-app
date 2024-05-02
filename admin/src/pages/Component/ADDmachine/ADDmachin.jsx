import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6
import axios from 'axios';

export default function ADDmachin() {
  const history = useNavigate();
  const [inputs, setMachineInput] = useState({
    mType: '',
    mRapiredDate: '',
    efficiency: '',
  });

  const handleChange = (e) => {
    setMachineInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/mDetails'));
  };

  const sendRequest = async () => {
    await axios
      .post('http://localhost:4000/machins', {
        mType: String(inputs.mType),
        mRapiredDate: String(inputs.mRapiredDate),
        efficiency: String(inputs.efficiency),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <center>
        <h1>ADD Machine Form</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '400px',
            margin: 'auto',
            border: '2px solid #007bff',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="mType">Machine Type:</label>
            <br />
            <input
              type="text"
              name="mType"
              onChange={handleChange}
              required
              value={inputs.mType}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="mRapiredDate">Machine Repaired Date:</label>
            <br />
            <input
              type="date"
              name="mRapiredDate"
              onChange={handleChange}
              required
              value={inputs.mRapiredDate}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="efficiency">Machine Efficiency:</label>
            <br />
            <input
              type="text"
              name="efficiency"
              onChange={handleChange}
              required
              value={inputs.efficiency}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
            }}
          >
            Submit
          </button>
        </form>
      </center>
    </div>
  );
}
