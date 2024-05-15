import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../employeeManagement/emp.css'

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
        const doc = new jsPDF('landscape'); 
        doc.autoTable({ html: '#salary-table', columns: [{ title: "empID" }, { title: "Month" }, { title: "Basic Salary" }, { title: "Total OT hours" }, { title: "OT Rate" }, { title: "Bonus" }, { title: "Total Salary" }, { title: "Account Number" }, { title: "Bank" }] });
        doc.save('employee_report.pdf');
    }
    
    return (
        <div className="salaryu-container">
            <div className="salaryu-content">
                <h1 className="salaryu-heading">Employees Salaries</h1>
                <Link to="/createsalary" className="add-salary-link">Add Employee Salary</Link>
                <div className="search-container">
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={handleChange} 
                        placeholder="Search by Employee ID"  
                        className="search-input" 
                    />
                    <button 
                        onClick={handleSearch} 
                        className="search-btn" 
                    >
                        Search
                    </button>
                </div>
                <div className="salary-table-container">
                    <table id="salary-table" className="salary-table">
                        <thead>
                            <tr>
                                <th>empID</th>
                                <th>Month</th>
                                <th>Basic Salary</th>
                                <th>Total OT hours</th>
                                <th>OT Rate</th>
                                <th>Bonus</th>
                                <th>Total Salary</th>
                                <th>Account Number</th>
                                <th>Bank</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salaryItem, index) => (
                                <tr key={index}> 
                                    <td>{salaryItem.empID}</td>
                                    <td>{salaryItem.month}</td>
                                    <td>{salaryItem.basicSalary}</td>
                                    <td>{salaryItem.totalOTHours}</td>
                                    <td>{salaryItem.otRate}</td>
                                    <td>{salaryItem.bonus}</td>
                                    <td>{salaryItem.totalSalary}</td>
                                    <td>{salaryItem.accountNumber}</td>
                                    <td>{salaryItem.bank}</td>
                                    <td className="action-buttons">
                                        <Link to={`/updatesal/${salaryItem._id}`} className="btn btn-success">Update</Link>
                                        <button className="deletesalbtn" onClick={() => handleDelete(salaryItem._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br></br>
                <button 
                    className="download-report-btn" 
                    onClick={downloadReport} 
                >
                    Download Report
                </button>
            </div>
        </div>
    );
}

export default SalaryU;
