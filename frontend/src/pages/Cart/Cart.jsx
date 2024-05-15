import React, { useEffect, useState } from 'react';
import "./Cart.css";
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {

  const {cartItems,food_list,removeFromCart, getTotalCartAmount, promotion, url} = useContext(StoreContext);
  const navigate = useNavigate();

  

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item)=>{
          if(cartItems[item._id]>0){
            return (
              <div>
              <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>LKR {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>LKR {item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount()===0?0:200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>LKR {promotion()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200-promotion()}</b>
            </div>     
          </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input-search'>
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
