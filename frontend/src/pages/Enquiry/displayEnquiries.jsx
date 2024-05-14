import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './DisplayEnquiries.css'; 
import { StoreContext } from '../../context/StoreContext';



function DisplayEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const {token} = useContext(StoreContext);

    useEffect(() => {
        axios.get('http://localhost:4000/api/displayenquiry',{},{headers:{token}})
            .then(response => {
                console.log(response.data);
                setEnquiries(response.data);
            })
            .catch(error => console.error('Error fetching enquiries:', error));
    }, []);

    return (
        <div className="enquiries-container"> {/* Add a className */}
            <h2 className="enquiries-title">Enquiries</h2> {/* Add a className */}
            <table className="enquiries-table"> {/* Add a className */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Action</th> {/* Add a new column for Action */}
                    </tr>
                </thead>
                <tbody>
                    
                    {enquiries.map(enquiry => (
                        <tr key={enquiry._id}>
                           
                            <td>{enquiry.name}</td>
                            <td>{enquiry.phone}</td>
                            <td>{enquiry.email}</td>
                            <td>{enquiry.product}</td>
                            <td>{enquiry.description}</td>
                            <td><Link to={`/enquirydetails/${enquiry._id}`} className="enquiry-details-link">View</Link></td> {/* Add a className */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayEnquiries;
