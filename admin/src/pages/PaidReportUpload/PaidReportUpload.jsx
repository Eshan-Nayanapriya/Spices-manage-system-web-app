import React, { useEffect, useState } from 'react';
import './PaidReportUpload.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';

const PaidReportUpload = ({ url }) => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0); // State for total number of delivered orders

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        // Filter for delivered orders
        const deliveredOrders = response.data.data.filter(order => order.status === 'Delivered');
        setFilteredOrders(deliveredOrders);

        // Initialize totals
        let amount = 0;

        // Calculate total amount and delivered orders
        deliveredOrders.forEach(order => {
          // Ensure order.amount is a number
          amount += parseFloat(order.amount) || 0;
        });

        // Set the calculated totals
        setTotalAmount(amount);
        setTotalDeliveredOrders(deliveredOrders.length); // Set total number of delivered orders
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // New function to handle order deletion
  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(url + `/api/order/delete/${orderId}`);
      if (response.data.success) {
        toast.success('Order deleted successfully');
        await fetchAllOrders();
      } else {
        toast.error('Error deleting order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order');
    }
  };

  return (
    <div className="orderadd">
      <div className="ppppsearch-bar">
        <h1>Completed Order Payments</h1>
        <button className="ppppsearch-barbtn">Download Report</button>
      </div>
      <div className="order-summary">
        <p>Total Amount: LKR {totalAmount.toFixed(2)}</p> {/* Display total amount */}
        <p>Total Delivered Orders: {totalDeliveredOrders}</p> {/* Display total delivered orders */}
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
              disabled={order.status === 'Delivered'}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick={() => deleteOrder(order._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaidReportUpload;
