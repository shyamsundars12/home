import React, { useState } from 'react';
import '../Admin-dashboard/Sidebar.css'
import {
    FaTh,
    FaBars,
    FaUserAlt,
 
    FaShoppingBag,
    FaThList,
  
    FaServer,
    FaIdCard
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaceRetouchingOffRounded } from '@mui/icons-material';


const Sidebar = ({children}) => {

    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Admin/",
            name:"Home",
            icon:<FaTh/>
        },
        {
            path:"/Admin/Customer",
            name:"Customer",
            icon:<FaUserAlt/>
        },
        {
            path:"/Admin/Employee",
            name:"Employee",
            icon:<FaIdCard/>
        },
        {
            path:"/Admin/Services",
            name:"Services",
            icon:<FaServer/>
        },
        {
            path:"/Admin/EmpSer",
            name:"EmpServices",
            icon:<FaShoppingBag/>
        },
        {
            path:"/Admin/addOn",
            name:"Add-Ons",
            icon:<FaThList/>
        },
        {
            path:"/Admin/Logout",
            name:"Logout",
            icon:<FaceRetouchingOffRounded/>
            
        }
    ]
    return (
        <>
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">DashBoard</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       {/* <FaBars onClick={toggle}/> */}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(

                        
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">

                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
               
           </div>
           <main>{children}</main>
        </>
    );
};




export default Sidebar;
// ChatGPT
