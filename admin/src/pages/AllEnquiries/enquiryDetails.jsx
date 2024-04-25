import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from "react-router-dom";
import './enquiryDetails.css'
import jsPDF from 'jspdf';

function EnquiryDetails() {
    const { id } = useParams();
    const [enquiry, setEnquiry] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    

    useEffect(() => {
        axios.get(`http://localhost:4000/api/enquiry/${id}`)
            .then(response => {
                console.log(response.data);
                setEnquiry(response.data);
            })
            .catch(error => console.error('Error fetching enquiry details:', error));
    }, [id]);

    if (!enquiry) {
        return <div>Loading...</div>;
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
        if (confirmDelete) {
            axios.delete(`http://localhost:4000/api/enquiry/deleteuser/${id}`)
                .then(res => {
                    console.log(res);
                    alert("Enquiry submitted successfully!");

                    navigate('/displayenquiry')
                })
                .catch(err => console.error(err));
        }
    };
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.setFontSize(12); // Set font size to 12px
        
        
    
        // Add content to the PDF with specified styling
        doc.text(`Product: ${enquiry.product}`, 50, 10);
        doc.text(`Customer Name: ${enquiry.name}`, 10, 20);
        doc.text(`Contact Number: 0${enquiry.phone}`, 10, 30);
        doc.text(`Email: ${enquiry.email}`, 10, 40);
        doc.text(`Enquiry: ${enquiry.description}`, 10, 50);
    
        doc.save('enquiry_details.pdf');
    };
    return (
        <div className="enquiriesD">
            <div className="title">
                Product:{enquiry.product}</div><br />
            <div className="flex">
                <div className="cus-Details">
                    <p className='head'>Name:</p>
                    <p>{enquiry.name}</p>
                    <p className='head'>Contact Number:</p>
                    <p>0{enquiry.phone}</p>
                    <p className='head'>Email:</p>
                    <p>{enquiry.email}</p>
                </div>
                <div className="Details">
                    {enquiry.product}
                    <div className="des">{enquiry.description}</div>
                    <div className="controls"> <button className="button-link" onClick={handleDelete}>Delete</button>
                    <button className="button-link" onClick={() => navigate(`/reply/${enquiry._id}`)}>Reply</button>
                        <button className="button-link" onClick={handleDownloadPDF}>Download PDF</button></div>

                </div>
            </div>

        </div>

    );
}

export default EnquiryDetails;
