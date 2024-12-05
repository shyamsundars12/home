import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
const Logout =() =>{
    
    localStorage.clear()
    Swal.fire({
        title: 'Logout Successfully',
        icon: 'success',
        text: "",
        confirmButtonText: 'Okay'
    }).then(() => {
        window.location.href = "/login"
    })
    return(
        <>
        

        </>
    );

}
export default Logout