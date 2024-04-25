import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function SalaryU() {
    const [salary, setSalary] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        axios.get('http://localhost:4000/Salary/getSalary')  
            .then(response => {
                setSalary(response.data);
                setFilteredSalaries(response.data);
            })
            .catch(error => {
                console.error('Error fetching salary:', error);
            });
    }, [])

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Do you want to delete?");
        if (confirmDelete) {
            axios.delete(`http://localhost:4000/Salary/deleteSal/${id}`)
                .then(res => {
                    console.log(res);
                    setSalary(salary.filter(item => item._id !== id));
                    setFilteredSalaries(filteredSalaries.filter(item => item._id !== id)); 
                })
                .catch(err => console.log(err))
        }
    }

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Salary Report",
        onAfterPrint: () => alert("Salary Report Successfully Downloaded!")
    });

    const handleSearch = () => {
        const newFilteredSalaries = salary.filter(item => {
            return item.empID.toLowerCase().includes(searchTerm.toLowerCase()) 
                
        });
        setFilteredSalaries(newFilteredSalaries);
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            setFilteredSalaries(salary); 
        } else {
            handleSearch(); 
        }
    }

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
            <div ref={ComponentsRef} className="w-75 bg-secondary rounded p-3">
                <h1 className="mb-0 text-center font-weight-bold text-black">Employees Salaries</h1>
                <Link to="/createsalary" className='btn btn-success'>Add Employee Salary</Link>
                <div style={{textAlign: 'center', marginBottom: '10px'}}>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={handleChange} 
                        placeholder="Search by Employee ID "  
                        style={{ padding: '10px', marginRight: '5px', width: '400px' }} 
                    />
                    <button 
                        onClick={handleSearch} 
                        className='btn btn-primary' 
                        style={{ padding: '10px', minWidth: '100px' }} 
                    >
                        Search
                    </button>
                </div>
                <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                    <table className="salarytable">
                        <thead>
                            <tr>
                                <th style={{ paddingRight: "20px" }}>empID</th>
                                <th style={{ paddingRight: "20px" }}>Month</th>
                                <th style={{ paddingRight: "20px" }}>Basic Salary</th>
                                <th style={{ paddingRight: "20px" }}>Total OT hours</th>
                                <th style={{ paddingRight: "20px" }}>OT Rate</th>
                                <th style={{ paddingRight: "20px" }}>Bonus</th>
                                <th style={{ paddingRight: "20px" }}>Total Salary</th>
                                <th style={{ paddingRight: "20px" }}>Account Number</th>
                                <th style={{ paddingRight: "20px" }}>Bank</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salaryItem, index) => (
                                <tr key={index}>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.empID}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.month}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.basicSalary}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.totalOTHours}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.otRate}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.bonus}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.totalSalary}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.accountNumber}</td>
                                    <td style={{ paddingRight: "20px" }}>{salaryItem.bank}</td>
                                    <td>
                                        <Link to={`/updatesal/${salaryItem._id}`} className='btn btn-success'>Update</Link>
                                        <Link to="/salaryy" className='btn btn-danger' onClick={(e) => handleDelete(salaryItem._id)}>Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <button onClick={handlePrint} className='btn btn-warning'>Download Report</button>
            </div>
        </div>
    );
}

export default SalaryU;
