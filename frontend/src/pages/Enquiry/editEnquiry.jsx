import React from 'react'

import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'


function editEnquiry() {
    const {id} = useParams()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [product, setProduct] = useState()
    const [description, setDescription] = useState()

    useEffect(()=>{
        axios.get('http://localhost:4000/api/editenquiry/update'+id)
        .then(result => {console.log(result)
            setName(result.data.name)
            setPhone(result.data.phone)
            setEmail(result.data.email)
            setProduct(result.data.product)
            setDescription(result.data.description)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <form className='enquiry'>
            <div className="enquiry-left">
                <p className="title">Update Enquiry</p>
                <div className="multifields">
                    <input name='name' onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' />
                    <input name='phone' onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Phone' />
                    <input name='email' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                    <label htmlFor="">Select here the product that you want to enquire about</label>
                    <select name='product' onChange={(e) => setProduct(e.target.value)} id="" >

                        <option value="1">Select Product</option>
                        <option value="1">Chilli</option>
                        <option value="1">Chilli</option>
                    </select>
                    <label htmlFor="">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} name="Description" id="" cols="50" rows="10"></textarea>
                </div>

                <button className='enquiry-but' type='submit'>Submit</button>
            </div>

        </form>
    )
}

export default editEnquiry
