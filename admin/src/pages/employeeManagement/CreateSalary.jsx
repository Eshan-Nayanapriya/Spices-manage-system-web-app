import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateSalary() {
    const [empID, setEmpID] = useState("");
    const [month, setMonth] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [totalOTHours, setTotalOTHours] = useState("");
    const [otRate, setOtRate] = useState("");
    const [bonus, setBonus] = useState("");
    const [totalSalary, setTotalSalary] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bank, setBank] = useState("");
    

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

       
        const calculatedTotalSalary = parseFloat(basicSalary) + (parseFloat(totalOTHours) * parseFloat(otRate)) + parseFloat(bonus);

        axios.post("http://localhost:4000/Salary/CreateSalary", { empID, month, basicSalary, totalOTHours, otRate, bonus, totalSalary: calculatedTotalSalary, accountNumber,  bank})
            .then(result => {
                console.log(result);
                navigate('/salaryy');
            })
            .catch(err => console.log(err));
    };

    return (
        
        <div style={{ 
                    backgroundImage: `url('../res/bg2.JPG')`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'  
                }}>
                    <div className='w-50 bg-white rounded p-3'>
                        <form onSubmit={handleSubmit}>
                            <h2>Add Salary</h2>
                            <div className='mb-2'>
                                <label htmlFor='empID'>EmpID</label>
                                <input id='empID' type='text' placeholder='Enter EmpID' className='form-control'
                                    value={empID} onChange={(e) => setEmpID(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='month'>Month</label>
                                <input id='month' type='month' placeholder='Enter Month' className='form-control'
                                    value={month} onChange={(e) => setMonth(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='basicSalary'>Basic Salary</label>
                                <input id='basicSalary' type='number' placeholder='Enter Basic Salary' className='form-control'
                                    value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='totalOTHours'>Total OT Hours</label>
                                <input id='totalOTHours' type='number' placeholder='Enter Total OT Hours' className='form-control'
                                    value={totalOTHours} onChange={(e) => setTotalOTHours(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='otRate'>OT Rate</label>
                                <input id='otRate' type='number' placeholder='Enter OT Rate' className='form-control'
                                    value={otRate} onChange={(e) => setOtRate(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='bonus'>Bonus</label>
                                <input id='bonus' type='number' placeholder='Enter Bonus' className='form-control'
                                    value={bonus} onChange={(e) => setBonus(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='totalSalary'>Total Salary</label>
                                <input id='totalSalary' type='number' placeholder='Total Salary' className='form-control'
                                    value={totalSalary} onChange={(e) => setTotalSalary(e.target.value)} disabled />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='accountNumber'>Account Number</label>
                                <input id='accountNumber' type='number' placeholder='Account Number' className='form-control'
                                    value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='bank'>Bank</label>
                                <input id='bank' type='String' placeholder='bank' className='form-control'
                                    value={bank} onChange={(e) => setBank(e.target.value)} />
                            </div>
                            <button className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>

    );
}

export default CreateSalary;
