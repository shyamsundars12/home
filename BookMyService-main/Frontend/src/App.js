
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Customer-dashboard/Home'
import Dashboard from './Components/Admin-dashboard/Dashboard';
import Places from './Components/Customer-dashboard/Place';
import Customer from './Components/Admin-dashboard/Customer/Customer';
import AddCustomer from './Components/Admin-dashboard/Customer/AddCustomer';
import EditCustomer from './Components/Admin-dashboard/Customer/EditCustomer';
import DetailCustomer from './Components/Admin-dashboard/Customer/DetailCustomer';
import Employee from './Components/Admin-dashboard/Employee/Employee';
import AddEmployee from './Components/Admin-dashboard/Employee/AddEmployee';
import EditEmployee from './Components/Admin-dashboard/Employee/EditEmployee';
import DetailEmployee from './Components/Admin-dashboard/Employee/DetailEmployee';
import Services from './Components/Admin-dashboard/Services/Services';
import AddServices from './Components/Admin-dashboard/Services/AddServices';
import EditServices from './Components/Admin-dashboard/Services/EditServices';
import DetailServices from './Components/Admin-dashboard/Services/DetailServices'
import Logout from './Components/Admin-dashboard/Logout'
import CustAddser from './Components/Customer-dashboard/CustAddser'
import HomeserDetails from './Components/Customer-dashboard/HomeSerDetails'
import CustomerCart from './Components/Customer-dashboard/CustomerCart'
import SetTime from './Components/Customer-dashboard/SetTime'
import OrderCart from './Components/Customer-dashboard/OrderCart'
import About from './Components/Customer-dashboard/About';
import Contact from './Components/Customer-dashboard/Contact';
import Cart from './Components/Customer-dashboard/Cart';
import Sample from './Components/Customer-dashboard/Sample';
import Sample2 from './Components/Customer-dashboard/Sample2';
import EmpSer from './Components/Admin-dashboard/EmpSer/EmpSer';
import AddOn from './Components/Admin-dashboard/AddOn/AddOn';
import EmpDashBoard, { AppContext } from './Components/Employee-dashboard/Dashboard';
import CustProfile from './Components/Customer-dashboard/CustProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustEditProfile from './Components/Customer-dashboard/CustEditProfile';
import CustOrder from './Components/Customer-dashboard/CustOrder';
import Feedback from './Components/Customer-dashboard/Feedback';
import Success from './Components/Customer-dashboard/Success';
import Failed from './Components/Customer-dashboard/Failed';
import img from './Components/img/AdminLock.jpg'
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import md5 from'md5'
import Typography from '@mui/material/Typography';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {


    if (localStorage.getItem('role') === md5("Admin")) {
      setIsLoggedIn(true);
  
    }
  }, []);
  const handleClose =() =>{
    setIsOpen(false);
  }
  const handleLogin =() =>{
    window.location.herf="/login";
  }
  return (
    <div>
    
      <Router>
      
        <Routes>
        
         
          <Route path="/Admin/" element={ <Dashboard />} />
          <Route path="/Admin/Customer" element={<Customer />} />
          <Route path="/Admin/Addcustomer" element={<AddCustomer />} />
          <Route path="/Admin/EditCustomer/:id" element={<EditCustomer />} />
          <Route path="/Admin/DetailCustomer/:id" element={<DetailCustomer />} />
          <Route path="/Admin/Employee" element={<Employee />} />
          <Route path="/Admin/AddEmployee" element={<AddEmployee />} />
          <Route path="/Admin/EditEmployee/:id" element={<EditEmployee />} />
          <Route path="/Admin/DetailEmployee/:id" element={<DetailEmployee />} />
          <Route path="/Admin/Services" element={<Services />} />
          <Route path="/Admin/AddServices" element={<AddServices />} />
          <Route path="/Admin/EditServices/:id" element={<EditServices />} />
          <Route path="/Admin/DetailServices/:id" element={<DetailServices />} />
          <Route path="/Admin/AddOn/" element={<AddOn />} />
          <Route path="/Admin/Logout/" element={<Logout />} />
          <Route path="/Admin/EmpSer/" element={<EmpSer />} />
        

          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home></Home>} />
          <Route path="/Customer/AddServices/" element={<CustAddser />} />
          <Route path="/Customer/About/" element={<About />} />
          <Route path="/Customer/Contact/" element={<Contact />} />
          <Route path="/Home/DetailsServices/:id" element={<HomeserDetails />} />
          <Route path="/Customer/SetTime/:id" element={<SetTime />} />
          <Route path="/Customer/OrderCart/:id" element={<OrderCart />} />
          <Route path="/Customer/Cart" element={<Cart />} />
          <Route path="/Customer/Sample" element={<Sample />} />
          <Route path="/Customer/Sample2" element={<Sample2 />} />
          <Route path="/Customer/Profile/:id" element={<CustProfile />} />
          <Route path="/Customer/CustEditProfile/:id" element={<CustEditProfile />} />
          <Route path="/Customer/CustOrder/" element={<CustOrder />} />
          <Route path="/Customer/Place/" element={<Places />} />
          <Route path="/Customer/Feedback/" element={<Feedback />} />
          <Route path="/Customer/Checkout/success" element={<Success />} />
          <Route path="/Customer/Checkout/failed" element={<Failed />} />
          

          
          <Route path="/Employee/" element={<EmpDashBoard />} />
         
          
        </Routes>








      </Router>

    </div>
  );
}

export default App;
