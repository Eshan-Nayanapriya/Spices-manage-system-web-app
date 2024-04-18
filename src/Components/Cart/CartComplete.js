import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function CartComplete() { 

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    total: "",
  });

  const handleChange =(e) =>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequeset().then(()=>history('/checkout'))
  }

  const sendRequeset = async()=>{
    await axios.post("http://Localhost:5000/users",{
        name: String (inputs.name),
        total: Number (inputs.total),
    }).then(res => res.data);
  }


  return (
    <div>
      <h1>Add User Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input type="text" name="name" onChange={handleChange} value = {inputs.name} required />
        </label>
        <br />
        <label>
          Total Amount:
          <input type="number" name="total" onChange={handleChange} value={inputs.total} required />
        </label>
        <br />
        <Button type="submit">Add User</Button>
      </form>
    </div>
  );
}

export default CartComplete;
