import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

    const downloadReport = () => {
        const doc = new jsPDF('landscape'); // Set the PDF document to landscape mode
        doc.autoTable({ html: '#salary-table', columns: [{ title: "empID" }, { title: "Month" }, { title: "Basic Salary" }, { title: "Total OT hours" }, { title: "OT Rate" }, { title: "Bonus" }, { title: "Total Salary" }, { title: "Account Number" }, { title: "Bank" }] });
        doc.save('employee_report.pdf');
    }
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width:'100%',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '20px',
                width: '100%',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{ 
                    marginBottom: '0', 
                    textAlign: 'center', 
                    fontWeight: 'bold', 
                    color: '#000'
                }}>Employees Salaries</h1>
                <a href="/createsalary" style={{ 
                    display: 'inline-block', 
                    margin: '10px 0', 
                    padding: '10px 20px', 
                    backgroundColor: '#28a745', 
                    color: '#fff',
                    textDecoration: 'none'
                }}>Add Employee Salary</a>
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '10px'
                }}>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={handleChange} 
                        placeholder="Search by Employee ID"  
                        style={{ 
                            padding: '10px', 
                            marginRight: '5px', 
                            width: '400px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }} 
                    />
                    <button 
                        onClick={handleSearch} 
                        style={{ 
                            padding: '10px 20px', 
                            minWidth: '100px', 
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '4px',
                            border: 'none'
                        }} 
                    >
                        Search
                    </button>
                </div>
                <div style={{ 
                    maxHeight: '40vh', 
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}>
                    <table id="salary-table" style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse',
                        backgroundColor:'#fff'
                    }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px' }}>empID</th>
                                <th style={{ padding: '10px' }}>Month</th>
                                <th style={{ padding: '10px' }}>Basic Salary</th>
                                <th style={{ padding: '10px' }}>Total OT hours</th>
                                <th style={{ padding: '10px' }}>OT Rate</th>
                                <th style={{ padding: '10px' }}>Bonus</th>
                                <th style={{ padding: '10px' }}>Total Salary</th>
                                <th style={{ padding: '10px' }}>Account Number</th>
                                <th style={{ padding: '10px' }}>Bank</th>
                                <th style={{ padding: '10px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salaryItem, index) => (
                                <tr key={index}> 
                                    <td style={{ padding: '10px' }}>{salaryItem.empID}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.month}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.basicSalary}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.totalOTHours}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.otRate}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.bonus}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.totalSalary}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.accountNumber}</td>
                                    <td style={{ padding: '10px' }}>{salaryItem.bank}</td>
                                    <td style={{ padding: '10px' }}>
                                        <a href={`/updatesal/${salaryItem._id}`} style={{ 
                                            marginRight: '10px', 
                                            padding: '5px 10px', 
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }}>Update</a>
                                        <a href="/salaryy" style={{ 
                                            padding: '5px 10px', 
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '4px'
                                        }} onClick={(e) => handleDelete(salaryItem._id)}>Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <button 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#FFA500',
                        color: '#fff',
                        borderRadius: '4px',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    onClick={downloadReport} // Associate downloadReport function with the button
                >
                    Download Report
                </button>
            </div>
        </div>
    );
}

export default SalaryU;
