import React from 'react'
import { Link } from "react-router-dom";
import './PaidPayments.css'
import  { useState, useEffect, useRef } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useReactToPrint } from "react-to-print";

const PaidPayments = () => {
  
    const [request, setRequest] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayedRequest, setDisplayedRequest] = useState([]);


    const [selectedMonth, setSelectedMonth] = useState(""); // State to store selected month
    const [totalAmount, setTotalAmount] = useState(null); // State to store total amount

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value); // Update selected month when changed
    };

    const handleGetTotalAmount = () => {
        if (selectedMonth !== "") {
            axios.get(`http://localhost:4000/api/paidPayments/totalAmount/${selectedMonth}`)
                .then(response => {
                    setTotalAmount(response.data); // Set total amount received from backend
                })
                .catch(error => {
                    console.error('Error fetching total amount:', error);
                });
        }
    };






    useEffect(() => {
        axios.get('http://localhost:4000/api/paidPayments/list')  //display details
            .then(response => {
              console.log(".................",response)
              setRequest(response.data);
              setDisplayedRequest(response.data);
            })
            .catch(error => {
                console.error('Error fetching paid payments:', error);
            });
    }, []);

    const ComponentsRef = useRef();   //report generation
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "paid payments Report"
    });

    const handleSearch = () => {
        const filteredReports = request.filter(item => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          return item.section.toLowerCase().includes(lowerSearchTerm) ||
                 item.role.toLowerCase().includes(lowerSearchTerm) ||
              //   item._id.toLowerCase().includes(lowerSearchTerm) ||
                 item.status.toLowerCase().includes(lowerSearchTerm) ||
                 item.amount.toString().toLowerCase().includes(lowerSearchTerm) || // Convert amount to string before comparison
                 item.description.toLowerCase().includes(lowerSearchTerm);
        });
        setDisplayedRequest(filteredReports);
      
        if (!filteredReports.length) {
          toast.error('No results found for your search.', { position: "bottom-center"}); // Display message for empty results
        }
      
      }

      const handleChange = (e) => {
        setSearchTerm(e.target.value); //search bar passing changing values
        if (e.target.value === "") {
          setDisplayedRequest(request); 
        } else {
          handleSearch(); 
        }
      }


  return (
      <div className="box">
      <h1>PAID PAYMENTS</h1>

      <div className="head-line">
      
      <div className="search-bar">
      <input className='search-bar'   type='text' name='search' value={searchTerm} onChange={handleChange}  autoComplete="off" placeholder='Search here...'/>
      <button className='search-btn'onClick={handleSearch} > Search </button>
      </div>

      </div>
      <div  ref={ComponentsRef} className="print">
      <div className='payment-r-table'>
      <br />
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Uploaded Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {displayedRequest.map((Item, index) => (

<tr key={index}>
              
<td className='iddd'> {Item._id} </td>
            <td> {Item.section} </td>
            <td> {Item.role} </td>
            <td className='des'> {Item.description} </td>
            <td> {Item.amount.toFixed(2)} </td>
            <td>{new Date(Item.createdAt).toLocaleDateString()}</td>
            <td> {Item.status} </td>  
          </tr>
          ))}

        </tbody>
      </table>
          <br />
          
      <div className="select-month">
                <label >Search Totals : </label>
                <select name='month' id='month' onChange={handleMonthChange}>
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
                </select>
                <button className='tot-btn' style={{ marginLeft: "20px" }} onClick={handleGetTotalAmount}>Get Total Amount</button>
                {totalAmount !== null && (
                    <div className="popup">
                      <label >Total Paid Amount : </label>
                      <input className='ppi' type="text" value= {totalAmount.toFixed(2)} />
                      </div>
                )}
            </div>
            </div>
            </div>

      <Link to={"/paymentRequests"}><button className='rpt-btn'>Back</button></Link>         
      <button onClick={handlePrint} style={{ marginLeft: "20px" }} className='rpt-btn'>Download Report</button>
      <Link to={"/Pdfupload"}><button style={{ marginLeft: "20px" }} className='rpt-btn'>Upload Report</button></Link>
    </div>
  )
}

export default PaidPayments
