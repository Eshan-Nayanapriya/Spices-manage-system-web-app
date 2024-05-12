import React from 'react'
import PromoNav from '../../PromoNav/PromoNav'
import './Add.css'
import { assets } from '../../../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const add = ({url}) => {

  const [promoimage, setImage] = useState(false);
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [data, setData] = useState({
    name: "",
    itemName: "",
    description: "",
    discount: "",
    validDate: "",
    termsAndCondition: ""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;

    setData(prevData => ({ ...prevData, [name]: value }));
    if (name === 'itemName') {
      fetchItemSuggestions(value);
    }
  }

  const fetchItemSuggestions = async (itemName) => {
    try {
      if (!itemName.trim()) {
        // If input field is empty, hide the item list
        setItemSuggestions([]);
        return;
      }
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const filteredItems = response.data.data.filter(item => {
          // Assuming item has a property `name` that holds the name of the item
          return item.name.toLowerCase().includes(itemName.toLowerCase());
        });
        setItemSuggestions(filteredItems);
      } else {
        setItemSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching item suggestions", error);
      setItemSuggestions([]);
    }
  };
  

  const selectItem = (itemName) => {
    setData(prevData => ({ ...prevData, itemName }));
    setItemSuggestions([]);
  };

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append( "name", data.name)
    formData.append( "itemName", data.itemName)
    formData.append( "description", data.description)
    formData.append( "discount", Number(data.discount))
    formData.append( "validDate", data.validDate)
    formData.append( "termsAndCondition", data.termsAndCondition)
    formData.append( "promoimage", promoimage)
    const response = await axios.post(`${url}/api/promotion/addpromotion`,formData);
    if(response.data.success){
      setData({
        name: "",
        itemName: "",
        description: "",
        discount: "",
        validDate: "",
        termsAndCondition: ""
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    } 
  }

  useEffect(()=>{
    console.log(data); //checking data in console
  },[data])

  return (
    
    <div className='promotion-add'>
      <PromoNav/>
      <div className="head-line">
        <h1>Promotion Add</h1>
      </div>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="promotion-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={promoimage?URL.createObjectURL(promoimage):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target. files[0])}type="file" id='promoimage' required />
        </div>
        <div className="add-promotion-name flex-col">
          <p>Promotion name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-name flex-col">
          <p>Item name</p>
          <input onChange={onChangeHandler} value={data.itemName} type="text" name='itemName' placeholder='Type here'/>
          <div className="suggestions">
          {itemSuggestions.length > 0 && (
            <ul className="item-suggestions">
              {itemSuggestions.map((item, index) => (
                <li key={index} onClick={() => selectItem(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
        <div className="add-promotion-description flex-col">
          <p>Promotion description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category">
          <div className="add-valid-date flex-col">
            <p>Product valid date</p>
            <input onChange={onChangeHandler} value={data.validDate} type="date" name='validDate' placeholder='Type here'/>
          </div>
          <div className="add-discount flex-col">
            <p>Discount</p>
            <input onChange={onChangeHandler} value={data.discount} type="Number" name='discount' placeholder='%'/>
          </div>
        </div>
        <div className="add-product-terms flex-col">
          <p>Promotion terms and conndition</p>
          <textarea onChange={onChangeHandler} value={data.termsAndCondition} name="termsAndCondition" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default add
