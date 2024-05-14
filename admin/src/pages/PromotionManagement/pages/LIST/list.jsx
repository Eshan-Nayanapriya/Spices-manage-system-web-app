import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import edit_icon from '../../../../assets/pen.png';
import remove_icon from '../../../../assets/cross_icon.png';

const list = ({ url }) => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${url}/api/promotion/listpromotion`);
      if (response.data.success) {
        setPromotions(response.data.data);
        setFilteredPromotions(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
      toast.error('Error fetching promotions');
    }
  };

  const removePromotion = async (promotionId) => {
    try {
      const confirmDelete = await toast.promise(
        async (resolve, reject) => {
          const result = window.confirm('Are you sure you want to delete this promotion?');
          if (result) {
            const response = await axios.post(`${url}/api/promotion/remove`, { id: promotionId });
            if (response.data.success) {
              toast.success(response.data.message);
              await fetchPromotions(); // Refresh promotions after deletion
            } else {
              toast.error('Error');
            }
            resolve();
          } else {
            reject();
          }
        },
        {
          pending: 'Confirming...',
          success: 'Promotion deleted successfully!',
          error: 'Error deleting promotion!',
        }
      );
    } catch (error) {
      console.error('Error removing promotion:', error);
      toast.error('Error removing promotion');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = promotions.filter(
      (promotion) =>
        promotion.name.toLowerCase().includes(query.toLowerCase()) ||
        promotion.itemName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPromotions(filtered);
    if (!filtered.length) {
      toast.error('No results found for your search.', { position: "bottom-center" }); // Display message for empty results
    }

  }

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div className='list-promotion'>
      <div className='head-linep'>
        <h1>All Promotions List</h1>
        <div className='promotion-request-head-line'>
          <Link to='/PromotionAdd'>
            <button className='promoaddbutton'>Add promotion</button>
          </Link>
          <div className='search-barp'>
            <input className='search-barp' type='text' name='search' autoComplete='off' placeholder='Search by Name or Item Name' value={searchQuery} onChange={handleSearch} />
            <button className='search-btnp'>Search</button>
          </div>
        </div>
      </div>

      <div className='listpromotion-format-main'>
        <p>Name</p>
        <p>Item Name</p>
        <p>Description</p>
        <p>Discount</p>
        <p>Valid Date</p>
        <p>Quantity</p>
        <p>Update</p>
        <p>Delete</p>
      </div>
      <div className='listpromotion-allpromotions'>
        <hr />
        {filteredPromotions.map((item) => (
          <div key={item._id}>
            <div className='listpromotion-format-main listpromotion-format'>
              <p>{item.name}</p>
              <p>{item.itemName}</p>
              <p>{item.description}</p>
              <p>{item.discount}</p>
              <p>{item.validDate}</p>
              <p>{item.quantity}</p>
              <img src={edit_icon} alt='' className='listproduct-edit-icon' />
              <img onClick={() => removePromotion(item._id)} src={remove_icon} className='listproduct-remove-icon' />
            </div>
            <hr />
          </div>
        ))}
      </div>
      <Link to='/PromotionReport'>
        <button className='pbattaabddbutton'>Generate report</button>
      </Link>
    </div>
  );
};

export default list;