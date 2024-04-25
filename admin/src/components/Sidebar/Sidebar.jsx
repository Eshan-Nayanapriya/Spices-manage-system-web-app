import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to="/supplier" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Supplier</p>
            </NavLink>
            <NavLink to="/paymentRequests" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Payment</p>
            </NavLink>

            <NavLink to="/displayenquiry" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Enquries</p>
                </NavLink>
            <NavLink to="/promotionManagement" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Promotion Management</p>

            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
