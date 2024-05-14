import React from 'react'
import PromoNav from '../../PromoNav/PromoNav'
import './List.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import edit_icon from '../../../../assets/pen.png'
import remove_icon from '../../../../assets/cross_icon.png'

const list = ({url}) => {

  const [promolist,setPromoList] = useState([]);

  const fetechList = async () => {
    const response = await axios.get(`${url}/api/promotion/listpromotion`);
    console.log(response.data);
    if(response.data.success){
      setPromoList(response.data.data)
    }else{
      toast.error("Error")
    } 
  }

  const handleSearchPromo = () => {
    const filteredReports = request.filter(item => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return item.section.toLowerCase().includes(lowerSearchTerm) ||
          //   item._id.toLowerCase().includes(lowerSearchTerm) ||
             item.name.toString().toLowerCase().includes(lowerSearchTerm);
    });
    setDisplayedRequest(filteredReports);
  
    if (!filteredReports.length) {
      toast.error('No results found for your search.', { position: "bottom-center"}); // Display message for empty results
    }
  
  }

  const removepromotion = async (promotionId) => {
    console.log(promotionId);
    const response = await axios.post(`${url}/api/promotion/remove`,{id:promotionId});
    await fetechList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetechList();
  },[])

  return (
    <div className='list-promotion'>
      <PromoNav/>
      <div className="head-linep">
        <h1>All Promotions List</h1>
        <div className="search-barp">
          <input className='search-bar-intp'  placeholder='Search here...'/>
          <button className='search-btnp' onClick={handleSearchPromo}> Search </button>
        </div>
      </div>
      
        <div className="listpromotion-format-main">
          <p>Name</p>
          <p>Item Name</p>
          <p>Description</p>
          <p>Discount</p>
          <p>Valid Date</p>
          <p>Quantity</p>
          <p>Update</p>
          <p>Delete</p>
        </div>
        <div className="listpromotion-allpromotions">
          <hr />
          {promolist.map((item) => (
          <div key={item._id}>
            <div className='listpromotion-format-main listpromotion-format'>
              <p>{item.name}</p>
              <p>{item.itemName}</p>
              <p>{item.description}</p>
              <p>{item.discount}</p>
              <p>{item.validDate}</p>
              <p>{item.quantity}</p>
              <img src={edit_icon} alt="" className="listproduct-edit-icon" />
              <img onClick={() => removepromotion(item._id)} src={remove_icon} className="listproduct-remove-icon" />
            </div>
            <hr />
          </div>
        ))}
        </div>
    </div>
  )
}

export default list
