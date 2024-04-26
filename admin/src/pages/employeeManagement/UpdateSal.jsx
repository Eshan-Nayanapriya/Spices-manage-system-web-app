import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateSalary() {
    const { id } = useParams();
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

    
    const calculateTotalSalary = () => {
        const calculatedTotalSalary = parseFloat(basicSalary) + (parseFloat(totalOTHours) * parseFloat(otRate)) + parseFloat(bonus);
        setTotalSalary(calculatedTotalSalary.toFixed(2)); 
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/Salary/getSalary/${id}`)
            .then(result => {
                console.log('Fetched data:', result.data);
                const salaryData = result.data; 
                setEmpID(salaryData.empID);
                setMonth(salaryData.month);
                setBasicSalary(salaryData.basicSalary);
                setTotalOTHours(salaryData.totalOTHours);
                setOtRate(salaryData.otRate);
                setBonus(salaryData.bonus);
                setTotalSalary(salaryData.totalSalary);
                setAccountNumber(salaryData.accountNumber);
                setBank(salaryData.bank);
            })
            .catch(error => {
                console.error('Error fetching salary:', error);
            });
    }, [id]);
    
    
    useEffect(() => {
        calculateTotalSalary();
    }, [basicSalary, totalOTHours, otRate, bonus]);

    const updateSalary = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/Salary/updateSal/${id}`, { empID, month, basicSalary, totalOTHours, otRate, bonus, totalSalary, accountNumber, bank})
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
                <form onSubmit={updateSalary}>
                    <h2>Update Salary</h2>
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
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSalary;
