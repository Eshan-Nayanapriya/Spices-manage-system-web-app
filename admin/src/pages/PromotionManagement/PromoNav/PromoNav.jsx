import React from 'react'
import './Promonav.css'
import { NavLink } from 'react-router-dom'

const PromoNav = () => {
  return (
    <div>
      <div className='topbar'>
            <div className="topbar-options">
                <NavLink to="/PromotionDashboard" className="topbar-option">
                    <p>Promotion Dashboard</p>
                </NavLink>
                <NavLink to="/PromotionAdd" className="topbar-option">
                    <p>Promotions Add</p>
                </NavLink>
                <NavLink to="/PromotionList" className="topbar-option">
                    <p>Promotion List</p>
                </NavLink>
                <NavLink to="/PromotionList" className="topbar-option">
                    <p>Promotion List</p>
                </NavLink>
                <NavLink to="/PromotionList" className="topbar-option">
                    <p>Promotion List</p>
                </NavLink>
            </div>

        </div>
    </div>
  )
}

export default PromoNav
