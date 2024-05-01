import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [jobroll, setJob_Roll] = useState("");
    const [bank, setBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post("http://localhost:4000/User/createUser", {
            name,
            password,
            confirmpassword,
            email,
            age,
            jobroll,
            bank,
            accountNumber
        })
        .then(result => {
            console.log(result);
            navigate('/employeeManagement');
        })
        .catch(err => {
            console.log(err);
            setError("Failed to create user");
        });
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
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit} className="form-container">
                    <h2 className="form-title">Add User</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' placeholder='Enter Name' className='form-control'
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' placeholder='Enter password' className='form-control'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='confirmpassword'>Confirm Password</label>
                        <input id='confirmpassword' type='password' placeholder='Enter password' className='form-control'
                            onChange={(e) => setConfPassword(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' placeholder='Enter Email' className='form-control'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='age'>Age</label>
                        <input id='age' type="text" placeholder="Enter Age" className="form-control"
                            onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='jobroll'>Job Roll</label>
                        <input id='jobroll' type="text" placeholder="Enter Job Roll" className="form-control"
                            onChange={(e) => setJob_Roll(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='bank'>Bank</label>
                        <input id='bank' type="text" placeholder="Enter Bank" className="form-control"
                            onChange={(e) => setBank(e.target.value)} />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='accountNumber'>Account Number</label>
                        <input id='accountNumber' type="text" placeholder="Enter Account Number" className="form-control"
                            onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <button className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
