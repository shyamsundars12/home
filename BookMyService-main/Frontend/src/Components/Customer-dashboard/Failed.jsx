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
const Failed = () => {

    useEffect(() => {

        const id = localStorage.getItem("orderId")
        const data = {
            orderId:id
        }
        axios.post("http://localhost:5000/order/failed", data);

        Swal.fire({
            title: 'payment failed',
            icon: 'warning',
            text: "Payment Failed...! please try again later... :/",
            confirmButtonText: 'Got It'
        }).then(()=>{
            window.location.href = "/Customer/Cart/";
        })
    },[]);
    return (
        <>

        </>
    );

}
export default Failed