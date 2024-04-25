import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './reply.css'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


function ReplyForm() {
    const { id } = useParams();
    const [enquiry, setEnquiry] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/enquiry/${id}`)
            .then(response => {
                console.log(response.data);
                setEnquiry(response.data);
            })
            .catch(error => console.error('Error fetching enquiry details:', error));
    }, [id]);

    const [replyData, setReplyData] = useState({
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReplyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assuming you have an endpoint to send the reply data
        axios.post(`http://localhost:4000/api/reply/${id}/add`, replyData)
            .then(response => {
                console.log(response.data);
                // Optionally, handle success response
            })
            .catch(error => console.error('Error sending reply:', error));
    };

    if (!enquiry) {
        return <div>Loading...</div>;
    }

    return (
        <div className="enquiry">
            <div className="enquiry-left">
                <div className="contact-details">
                    <h2>Reply to Enquiry to {enquiry.name}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="multifields">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={replyData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={replyData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="enquiry-but">Send Reply</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReplyForm;
