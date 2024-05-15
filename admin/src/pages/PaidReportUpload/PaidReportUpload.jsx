import React, { useEffect, useState } from 'react';
import './PaidReportUpload.css'
import axios from 'axios';
import { assets } from '../../assets/assets';

const PaidReportUpload = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        const deliveredOrders = response.data.data.filter(order => order.status === 'Delivered');
        setOrders(deliveredOrders);
        setFilteredOrders(deliveredOrders);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  // Change: Added confirmation dialog and status update
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    // Change: Check if the new status is 'Delivered'
    if (newStatus === 'Delivered') {
      const confirmDelivery = window.confirm('Confirm delivered');
      if (!confirmDelivery) {
        return;
      }
    }

    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: newStatus,
    });

    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orderadd">
      <div className="ppppsearch-bar">
        <h1>Completed Orders</h1>
        <button className="ppppsearch-barbtn">Download Report</button>
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
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              // Change: Disable the dropdown if the status is 'Delivered'
              disabled={order.status === 'Delivered'}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  };

export default PaidReportUpload
