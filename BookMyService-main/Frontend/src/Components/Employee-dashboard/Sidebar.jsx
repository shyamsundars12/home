import React, { useState } from 'react';
import './Dashboard'
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


const Sidebar = ({children}) => {

    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const printHello = ()=>{
        console.log("kemcho")
    }
    const menuItem=[
        {
            // path:"/Employee",
            name:"Home",
            icon:<FaTh/>,
            func: printHello
        },
        {
            path:"/Employee/today",
            name:"Present Schedules",
            icon:<FaUserAlt/>
        },
        
        {
            path:"/Employee/upcoming",
            name:"Up Coming Schedules",
            icon:<FaShoppingBag/>
        },
        
        {
            path:"/Employee/history",
            name:"History",
            icon:<FaServer/>
        },
        {
            path:"/Employee/feedback",
            name:"Feedbacks",
            icon:<FaServer/>
        },
        {
            path:"/Employee/logout",
            name:"Logout",
            icon:<FaThList/>
        }
    ]
    return (
        <>
           <div style={{width: "400px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display:"block"}} className="logo">DashBoard</h1>
                   <div style={{marginLeft: "50px"}} className="bars">
                       {/* <FaBars onClick={toggle}/> */}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <div onClick={item.func} key={index}  className="link" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                           </div>
                   ))
               }
           </div>
           <main>{children}</main>
        </>
    );
};



