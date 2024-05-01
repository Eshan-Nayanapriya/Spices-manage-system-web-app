import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [jobRoll, setJobRoll] = useState("");
    const [bank, setBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/User/getEmpuser/${id}`)
            .then(result => {
                console.log(result);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setJobRoll(result.data.jobroll);
                setBank(result.data.bank);
                setAccountNumber(result.data.accountNumber);
                setPassword(result.data.password);
                setConfPassword(result.data.confirmpassword);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [id]);

    const update = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        axios.put(`http://localhost:4000/User/updateUser/${id}`, { name, email, password, confirmpassword, age, jobroll: jobRoll, bank, accountNumber })
            .then(result => {
                console.log(result);
                navigate('/employeeManagement');
            })
            .catch(err => {
                console.log(err);
                setError("Failed to update user");
            });
    };

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
                <form onSubmit={update} className="form-container">
                    <h2 className="form-title">Update User</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' placeholder='Enter Name' className='form-control'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' placeholder='Enter password' className='form-control'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='confirmpassword'>Confirm Password</label>
                        <input id='confirmpassword' type='password' placeholder='Enter password' className='form-control'
                            value={confirmpassword} onChange={(e) => setConfPassword(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' placeholder='Enter Email' className='form-control'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='age'>Age</label>
                        <input id='age' type="text" placeholder="Enter Age" className="form-control"
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='jobroll'>Job Roll</label>
                        <input id='jobroll' type="text" placeholder="Enter Job Roll" className="form-control"
                            value={jobRoll} onChange={(e) => setJobRoll(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bank'>Bank</label>
                        <input id='bank' type="text" placeholder="Enter bank" className="form-control"
                            value={bank} onChange={(e) => setBank(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='accountNumber'>Account Number</label>
                        <input id='accountNumber' type="text" placeholder="Enter Account Number" className="form-control"
                            value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <button className="btn btn-success btn-block">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
