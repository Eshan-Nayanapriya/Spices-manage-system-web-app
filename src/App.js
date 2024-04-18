import React from 'react'
import Checkout from './Components/Checkout/Checkout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartComplete from './Components/Cart/CartComplete';
import OrderSummary from './Components/Checkout/OrderSummary';
import DeliveryAddressForm from './Components/Checkout/DeliveryAddressForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/deliveryinfo" element={<DeliveryAddressForm/>} />
        <Route path="/summary" element={<OrderSummary />} />
        <Route path="/" element={<CartComplete />} />
      </Routes>
    </Router>
  )
}

export default App

