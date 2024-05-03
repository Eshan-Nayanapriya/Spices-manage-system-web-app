import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import edit_icon from '../../assets/pen.png'
import remove_icon from '../../assets/cross_icon.png'

const List = ({url}) => {
  
  const [list,setList] = useState([]);

  const fetechList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error("Error")
    } 
  }

  const removeFood = async (foodId) => {
    console.log(foodId); //check foodid
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
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
      <div className='list-product'>
        <h1>All Foods List</h1>
          <div className="listproduct-format-main">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Description</p>
            <p>Price</p>
            <p>Update</p>
            <p>Delete</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
          {list.map((item,index)=>{
              
              return <><div key={index} className='listproduct-format-main listproduct-format' >
                <img src={`${url}/images/`+item.image}  alt="" className="listproduct-product-icon"/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <Link to={`/edit/${item._id}`}><img src={edit_icon} alt=""  className="listproduct-edit-icon" /></Link>
                <img onClick={()=>removeFood(item._id)} src={remove_icon}className="listproduct-remove-icon" />
                </div>
                <hr />
                </>
          })}
        </div>
      </div>
  )
}

export default List
