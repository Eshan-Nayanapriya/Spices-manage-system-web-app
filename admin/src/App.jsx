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
import DisplayEnquiries from './pages/AllEnquiries/displayEnquiries.jsx'
import EnquiryDetails from './pages/AllEnquiries/enquiryDetails.jsx';

import PromotionManagement from './pages/PromotionManagement/PromotionManagement'
import PromotionAdd from './pages/PromotionManagement/pages/ADD/add'
import PromotionList from './pages/PromotionManagement/pages/LIST/list'

import Users from './pages/employeeManagement/Users.jsx';
import UpdateUser from './pages/employeeManagement/UpdateUser.jsx';
import CreateUser from './pages/employeeManagement/CreateUser.jsx';
import SalaryU from './pages/employeeManagement/SalaryU.jsx';
import CreateSalary from './pages/employeeManagement/CreateSalary.jsx';
import UpdateSalary from './pages/employeeManagement/UpdateSal.jsx';
import EmpU from './pages/employeeManagement/empU.jsx';
import EmpLogin from './pages/employeeManagement/empLogin.jsx';

import FactoryHome from './pages/Component/FactoryHome.jsx'
import Machanics from './pages/Component/Machanic Details/Machanics'
import AddMachanic from './pages/Component/AddMachanic/AddMachanic';
import UpdateMachanic from './pages/Component/UpdateMachanic/UpdateMachanic';
import Machines from './pages/Component/MachineDetails/Machines';
import ADDmachin from './pages/Component/ADDmachine/ADDmachin';
import UpdateMachine from './pages/Component/Update Machine/UpdateMachine';
import Utilitis from './pages/Component/UtilityDetails/Utilitis';
import AddUtility from './pages/Component/AddUtility/AddUtility';
import UpdateUtility from './pages/Component/UpdateUtility/UpdateUtility';
import EditProduct from './pages/EditProduct/EditProduct.jsx'
import Report from './pages/Report/Report.jsx'


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
          <Route path="/Supplierpro/RawMreqres" element={<RawMreqRes />} />
          <Route path="/Supplier/RawMreq" element={<RawMReq />} />
          <Route path="/Supplierpro" element={<SupplierProfile />} />
          <Route path="/Supplier/ratings" element={<Ratings />} />
          <Route path="/Supplier/addrating" element={<AddRating />} />          
          <Route path="/Calculation" element={< Calculation />} />


          {/*menusha part*/}
          <Route path='/displayenquiry' element={<DisplayEnquiries />}></Route>
          <Route path="/enquirydetails/:id" element={<EnquiryDetails />} />

          {/*sadan part */}
          <Route path="/PromotionManagement" element={<PromotionManagement url={url}/>}/>
          <Route path="/PromotionAdd" element={<PromotionAdd url={url}/>}/>
          <Route path="/PromotionList" element={<PromotionList url={url}/>}/>


          {/*torin part */}
          <Route path='/employeeManagement' element={<Users />}></Route>
          <Route path='/empcreate' element={<CreateUser />}></Route>
          <Route path='/empupdate/:id' element={<UpdateUser />}></Route>
          <Route path='/salaryy' element={<SalaryU />}></Route>
          <Route path='/createsalary' element={<CreateSalary />}></Route>
          <Route path='/updatesal/:id' element={<UpdateSalary />}></Route>
          <Route path="/emplogin" element={<EmpLogin  />} />
          <Route path="/emp/:id" element={<EmpU />} />

          {/*asela part */}
          <Route path='/factoryManagement' element={<FactoryHome />}></Route>
          <Route path="/mainhome" element ={<FactoryHome/>}/> 
          <Route path="/addMachine" element ={<AddMachanic/>}/>  
          <Route path="/machineDetails" element ={<Machanics/>}/>
          <Route path="/machineDetails/:id" element ={<UpdateMachanic/>}/>  

          <Route path="/mAdd" element ={<ADDmachin/>}/>  
          <Route path="/mDetails" element ={<Machines/>}/>
          <Route path="/mDetails/:id" element ={<UpdateMachine/>}/>

          <Route path="/uDetails" element ={<Utilitis/>}/>  
          <Route path="/uAdd" element ={<AddUtility/>}/> 
          <Route path="/uDetails/:id" element ={<UpdateUtility/>}/> 
           
           {/*imashi part */}
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/"  element={<List url={url}/>}/>
          <Route path="/list"  element={<List url={url}/>}/>
          <Route path="/edit/:id" element={<EditProduct/>}/>
          <Route path="/report" element={<Report url={url}/>}/>
          
        </Routes>
      </div>
    </div>
  )
}

export default App
