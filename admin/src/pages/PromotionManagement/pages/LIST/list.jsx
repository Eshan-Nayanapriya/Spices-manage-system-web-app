import React from 'react'
import PromoNav from '../../PromoNav/PromoNav'
import './List.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import edit_icon from '../../../../assets/pen.png'
import remove_icon from '../../../../assets/cross_icon.png'

const list = ({url}) => {

  const [list,setList] = useState([]);

  const fetechList = async () => {
    const response = await axios.get(`${url}/api/promotion/listpromotion`);
    console.log(response.data);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error("Error")
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
      <div className="head-line">
        <h1>All Promotions List</h1>
        <div className="search-bar">
          <input className='search-bar-int'  placeholder='Search here...'/>
          <button className='search-btn'  > Search </button>
        </div>
      </div>
      
        <div className="listpromotion-format-main">
          <p>Image</p>
          <p>Name</p>
          <p>Item Name</p>
          <p>Description</p>
          <p>Discount</p>
          <p>Valid Date</p>
          <p>Terms And Condition</p>
          <p>Update</p>
          <p>Delete</p>
        </div>
        <div className="listpromotion-allpromotions">
          <hr />
          {list.map((item,index)=>{
              return <><div key={index} className='listproduct-format-main listproduct-format' >
                <img src={`${url}/promoupload/`+item.promoimage}  alt="promotion Image" className="listproduct-product-icon"/>
                <p>{item.name}</p>
                <p>{item.itemName}</p>
                <p>{item.description}</p>
                <p>{item.discount}</p>
                <p>{item.validDatet}</p>
                <p>{item.termsAndCondition}</p>
                <Link to={`/edit/${item._id}`}><img src={edit_icon} alt=""  className="listproduct-edit-icon" /></Link>
                <img onClick={()=>removepromotion(item._id)} src={remove_icon}className="listproduct-remove-icon" />
                </div>
                <hr />
                </>
          })}
        </div>
    </div>
  )
}

export default list
