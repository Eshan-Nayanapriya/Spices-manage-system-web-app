import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/AddProduct/Add'
import List from './pages/ListProduct/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupplyManager from './pages/Supplier/SupplyManager'
import SupplierProfile from "./pages/Supplier/SupplierProfile";
import Ratings from "./pages/Supplier/Ratings";
import RawMreqRes from "./pages/Supplier/RawMReqRes";
import RawMReq from "./pages/Supplier/RawMReq";
import AddRating from "./pages/Supplier/AddRating";
import Calculation from "./pages/Supplier/Calculation"
import SupplyRequest from "./pages/Supplier/SupplyRequest"
import CreateOrder from "./pages/Supplier/CreateOrder"
import UpdateOrder from "./pages/Supplier/UpdateOrder"
import PaymentRequests from './pages/PaymentRequests/PaymentRequests'
import UpdatePaymentRequest from './pages/UpdatePaymentRequest/UpdatePaymentRequest';
import AddPaymentRequest from './pages/AddPaymentRequest/AddPaymentRequest';
import PaidPayments from './pages/PaidPayments/PaidPayments';
import Pdfupload from './pages/PaidReportUpload/PaidReportUpload'; 

const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>

          {/*batta part */}
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          <Route path='/paymentRequests' element={<PaymentRequests/>}/>
        <Route path='/AddPaymentRequest' element={<AddPaymentRequest/>}/>
        <Route path='/UpdatePaymentRequest/:id' element={<UpdatePaymentRequest/>}/>
        <Route path='/PaidPayments' element={<PaidPayments/>}/>
        <Route path='/Pdfupload' element={<Pdfupload/>}/>

          {/*udan part */}
          <Route path="/SupplyRequest" element={<SupplyRequest />}/>
          <Route path="/create" element={<CreateOrder />}/>
          <Route path="SupplyRequest/update/:id"element={<UpdateOrder />}/>
          <Route path="/supplier" element={<SupplyManager url={url}/>}/>
          <Route path="/Supplier/RawMreqres" element={<RawMreqRes />} />
          <Route path="/Supplier/RawMreq" element={<RawMReq />} />
          <Route path="/Supplierpro" element={<SupplierProfile />} />
          <Route path="/Supplier/ratings" element={<Ratings />} />
          <Route path="/Supplier/addrating" element={<AddRating />} />          
          <Route path="/Calculation" element={< Calculation />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
