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
                    <p>Add Products</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Product List</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
                <NavLink to="/supplier" className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Supply Manager</p>
                </NavLink>
                <NavLink to="/supplierpro" className="sidebar-option">
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
                <NavLink to="/employeeManagement" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Employee Management</p>
            </NavLink>
            <NavLink to="/factoryManagement" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Factory Management</p>
            </NavLink>
            </div>

        </div>
    )
}

export default Sidebar
