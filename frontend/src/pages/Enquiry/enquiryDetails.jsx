import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from "react-router-dom";
import './enquiryDetails.css'

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
                    navigate('/success');
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="enquiries">
            <div className="title">
                Product:  {enquiry.product}</div><br />
            <div className="flex">
                <div className="cus-Details">
                    <p>Name:{enquiry.name}</p>
                    <p>Contact Number:0{enquiry.phone}</p>
                    <p>Email:{enquiry.email}</p>
                </div>
                <div className="Details">
                    {enquiry.product}
                    {enquiry.description}
                    <div className="controls"> <button className="button-link"  onClick={handleDelete}>Delete</button>
                    <Link to={`/reply/${enquiry._id}`} className="button-link">Reply</Link></div>

                </div>
            </div>

        </div>

    );
}

export default EnquiryDetails;
