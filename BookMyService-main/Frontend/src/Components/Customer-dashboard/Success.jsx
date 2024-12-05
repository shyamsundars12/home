import NavBar from "../NavBar";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaShoppingCart } from 'react-icons/fa';
import { Box, Paper, Container, Grid, Rating, TextareaAutosize } from '@mui/material';
import { Send } from '@mui/icons-material';
import {
    Card,
    CardContent,
} from '@mui/material';
const Success = () => {

    useEffect(() => {

        const id = localStorage.getItem("id")
        const data = {
            custId: id
        }
        axios.post("http://localhost:5000/customer/removeCart", data);

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: "Your Order Has Been Placed Successfully",
            confirmButtonText: 'Okay'
        }).then(()=>{
            localStorage.removeItem("orderId");
            window.location.href = "/Customer/CustOrder/";
        })
    },[]);
    return (
        <>

        </>
    );

}
export default Success