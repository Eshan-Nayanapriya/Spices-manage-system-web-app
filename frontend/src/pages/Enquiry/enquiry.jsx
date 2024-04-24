import React, { useEffect, useState } from 'react'
import './enquiry.css'
import axios from 'axios'

const Enquiry = () => {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [product, setProduct] = useState()
    const [description, setDescription] = useState()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/enquiry/add", { name, phone, email, product, description })
        .then(result => {
            console.log(result)
            alert("Enquiry submitted successfully!");
        })
        .catch(err => console.log(err))
    }
    return (
        
        <div className="enquiry">
        <div className="contact-details">
            <h2>Contact Details</h2>
            <p>Address: 123 Street, City</p>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Hotline: 987-654-3210</p>
        </div>
        <div className="enquiry-left">
        <form onSubmit={Submit} className='enquiry'>
            <div className="enquiry-left">
                <p className="titlex">Enquiry Form</p>
                <div className="multifields">
                    <input name='name' onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' />
                    <input name='phone' onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Phone' />
                    <input name='email' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                    <label>Select here the product that you want to enquire about</label>
                    <select name='product' onChange={(e) => setProduct(e.target.value)} id="" >

                        <option value="1" disabled>Select Product</option>
                        <option value="chilli">Chilli</option>
                        <option value="turmeric">turmeric</option>
                    </select>
                    <label htmlFor="">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} name="Description" id="" cols="50" rows="10"></textarea>
                </div>

                <button className="enquiry-but" type='submit'>Submit</button>
            </div>

        </form>
        </div>
    </div>
    )
}

export default Enquiry