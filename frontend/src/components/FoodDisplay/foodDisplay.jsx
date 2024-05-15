import React, { useState } from 'react'
import './foodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import search from '../../assets/frontend_assets/search.png';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
 
  return (
    <div className='food-display' id='food-display'>
      <h2>Top Products Near You...</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
            if(category==="All" || category===item.category){
                return <FoodItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} quantity={item.quantity}/>
            }  
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
