import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProduct.css';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/food/list/${id}`);
                const { data } = response.data;
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category
                    
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, price, category, image } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('description', description);
        formDataToSend.append('price', price);
        formDataToSend.append('category', category);
        formDataToSend.append('image', image);


        try {
            const response = await axios.put(`http://localhost:4000/api/food/list/${id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data);
            // Handle success, redirect, or show a success message
        } catch (error) {
            console.log('Error editing product:', error);
            // Handle error, show error message to user
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                   <label htmlFor="name">Name:</label>
                   <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange} />
                </div>
                <div className="form-group">
                <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
