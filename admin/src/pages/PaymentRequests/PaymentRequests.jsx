import React from 'react'
import './PaymentRequests.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useReactToPrint } from "react-to-print";

function PaymentRequest() {

  const navigate = useNavigate();

  const [request, setRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedRequest, setDisplayedRequest] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/paymentRequest/list')  //display details
      .then(response => {
        console.log(".................", response)
        setRequest(response.data);
        setDisplayedRequest(response.data);
      })
      .catch(error => {
        console.error('Error fetching payment requests:', error);
      });
  }, []);


  const ComponentsRef = useRef();   //report generation
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Payment Requests Report"
  });


  const deleteHandler = (id) => {
    const confirmDelete = window.confirm("Please Confirm Delete ?");  //delete function
    if (confirmDelete) {
      axios.delete(`http://localhost:4000/api/paymentRequest/list/${id}`)
        .then(res => {
          console.log(res);
          setRequest(prevRequests => prevRequests.filter(item => item._id !== id));
          setDisplayedRequest(prevDisplayedRequests => prevDisplayedRequests.filter(item => item._id !== id));
          console.log('Item deleted successfully');
        })
        .then(() => toast.success(`Request Deleted`, { position: "bottom-center" }))
        .then(() => navigate("/paymentRequests"))
        .catch(err => console.log(err))
    }
  }

  const handleSearch = () => {
    const filteredReports = request.filter(item => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return item.section.toLowerCase().includes(lowerSearchTerm) ||
        //   item._id.toLowerCase().includes(lowerSearchTerm) ||
        item.createdAt.toLowerCase().includes(lowerSearchTerm) ||
        item.amount.toString().toLowerCase().includes(lowerSearchTerm); // Convert amount to string before comparison
    });
    setDisplayedRequest(filteredReports);

    if (!filteredReports.length) {
      toast.error('No results found for your search.', { position: "bottom-center" }); // Display message for empty results
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
    <div className='payment-request-table'>
      <h1>PAYMENT REQUESTS</h1>

      <div className="payment-request-head-line">
        <Link to={"/AddPaymentRequest"}>
          <button className='addbutton'>Add Payment Request</button>
        </Link>

        <div className="search-barbbbb">
          <input className='search-barbbbb' value={searchTerm} onChange={handleChange} type='text' name='search' autoComplete="off" placeholder='Search here...' />
          <button className='search-btnbbbb' onClick={handleSearch} > Search </button>
        </div>

      </div>
      <div ref={ComponentsRef} className="print1">
        <br />
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Section</th>
              <th>Role</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Submitted Date</th>
              <th>Status</th>
              <th>Actions</th>
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

                <td className='action-buttons'>
                  <div className="button-container">
                    <Link to={`/UpdatePaymentRequest/${Item._id}`}>
                      <button className='update-button'>Update</button>
                    </Link>
                    <button onClick={() => deleteHandler(Item._id)} className='delete-button'>Delete</button>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className='rpt-btn'>Download Report</button>
      <Link to={"/PaidPayments"}><button style={{ marginLeft: "20px" }} className='rpt-btn'>Paid Payments</button></Link>
    </div>

  );
}

export default PaymentRequest
