import React from 'react'
import './Add.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData]= useState({
    name: "",
    description: "",
    price: "",
    category : "Powder"
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append( "name", data.name)
    formData.append( "description", data.description)
    formData.append( "price", Number(data.price))
    formData.append( "category", data.category)
    formData.append( "image", image)
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category : "Powder"
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
    <div className='container'>
      <h1>Add Product</h1>
      <hr />
      <br />
      <form  onSubmit={onSubmitHandler}>
          
          <div className="form-group">
          <label htmlFor="name">Product Name:</label>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
          </div>
          <div className="form-group">
          <label htmlFor="description">Product Description:</label>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
          </div>
          
            <div className="form-group">
            <label htmlFor="">Product category:</label>
              <select onChange={onChangeHandler} name="category">
                <option value="Powder">Powder</option>
                <option value="Pieces">Pieces</option>
                <option value="Flour">Flour</option>
                <option value="Oil">Oil</option>
                <option value="Seeds">Seeds</option>
                <option value="Other">Other</option>

              </select>
            </div>
            <div className="form-group">
            <label htmlFor="price">Product Price:</label>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='LKR'/>
            </div>
          
          <div className="form-group">
            <label >Product Image:</label>
            <label htmlFor="image" >
              <img className='uploaded-image'src={image?URL.createObjectURL(image):upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target. files[0])}type="file" id='image' hidden required/>
          </div>
          
          <div className="form-group">
          <button type='submit'>ADD</button>
          </div>
      </form>
    </div>
  )
}

export default Add



