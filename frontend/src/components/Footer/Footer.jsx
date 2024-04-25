import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Savor precision-crafted flavors at Sahan Grinding Mill in Matara, renowned for its rich spices. Explore our unique culinary offerings.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@SGM.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        copyright 2024 Y2S2 group no T-137 - All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
