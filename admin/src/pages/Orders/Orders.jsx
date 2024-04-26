import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { jsPDF } from 'jspdf';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    const yPos = 10;

    doc.text('Order Report', 10, yPos);

    filteredOrders.forEach((order, index) => {
      const yPosOrder = yPos + (index + 1) * 30;
      doc.text(`Order ${index + 1}`, 10, yPosOrder);

      let itemYPos = yPosOrder + 10;
      order.items.forEach((item, itemIndex) => {
        doc.text(`Item ${itemIndex + 1}: ${item.name} x ${item.quantity}`, 10, itemYPos);
        itemYPos += 10;
      });

      doc.text(`Amount: LKR ${order.amount}`, 10, itemYPos);
      doc.text(`Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`, 10, itemYPos + 10);
      doc.text(`Phone: ${order.address.phone}`, 10, itemYPos + 20);

      doc.text('----------------------------------------', 10, itemYPos + 30);
    });

    doc.save('order_report.pdf');
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={generatePDF}>Generate PDF Report</button>
      </div>
      <div className="order-listz">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country},{' '}
                  {order.address.zipcode}
                </p>
              </div>
              <p className="oder-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>LKR {order.amount}</p>
            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick="">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
