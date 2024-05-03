import React from 'react'
import { useState } from "react";
import './Header.css'


const Header = () => {

  const [menu,setMenu] = useState("home");

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite spices here</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic facilis, ipsum suscipit asperiores consequatur iusto soluta, at ducimus nam aspernatur architecto deserunt ipsa dolore sint. Eveniet vitae deleniti itaque, quaerat praesentium doloribus molestiae id dolores.
        </p>
        <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}><button>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
