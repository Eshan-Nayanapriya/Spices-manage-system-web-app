import React, { useState } from 'react';
import './foodDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import search from '../../assets/frontend_assets/search.png';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFoodList = food_list.filter(item =>
        (category === "All" || category === item.category) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='food-display' id='food-display'>
            <div className="header-container">
                <h2>Top Products Near You...</h2>
                <div className="search-container">
                    <img src={search} alt="search" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <br />
            </div>
            <div className="food-display-list">
                {filteredFoodList.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        quantity={item.quantity}
                    />
                ))}
            </div>
        </div>
    );
}

export default FoodDisplay;
