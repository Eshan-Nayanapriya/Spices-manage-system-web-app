import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import edit_icon from '../../assets/pen.png';
import remove_icon from '../../assets/cross_icon.png';
import search from '../../assets/search.png';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('');

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setFilterdata(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food");
    }
  }
   //search
  const handleSearch = (event) => {
    const getSearch = event.target.value.toLowerCase();
    const searchData = filterdata.filter(item => item.name.toLowerCase().includes(getSearch));
    setList(searchData);
    setQuery(getSearch);
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Foods List</h1>
      <br />
      <div className="searchbar">
        <input type="text" name='name' value={query} onChange={(e) => handleSearch(e)} placeholder='Search.....' />
        <img src={search} alt="" className='search-icon' />
      </div>
      <Link to={'/report'}><h1 className="rep">Generate Report</h1></Link>
      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Description</p>
        <p>Price</p>
        <p>Update</p>
        <p>Delete</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {list.map((item, index) => {
         return<> <div key={index} className='listproduct-format-main listproduct-format'>
            <img src={`${url}/images/${item.image}`} alt="" className="listproduct-product-icon" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <Link to={`/edit/${item._id}`}><img src={edit_icon} alt="" className="listproduct-edit-icon" /></Link>
            <img onClick={() => removeFood(item._id)} src={remove_icon} className="listproduct-remove-icon" alt="remove" />
          </div>
          <hr />
          </>
         })}
      </div>
    </div>
  );
}

export default List;
