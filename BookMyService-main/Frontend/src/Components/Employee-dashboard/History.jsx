import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaShoppingCart } from 'react-icons/fa';
import img from '../img/loginBlock.png'
import { Box, Paper, Container, Grid, Rating, TextareaAutosize } from '@mui/material';
import {
    Card,
    CardContent,
} from '@mui/material';
const Today = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartActive, setCartActive] = useState(false)
    const [Complete, setComplete] = useState([]);
    const [pending, setPending] = useState([]);
    // const [cartItems, set] = useState([]);
    const [open, setOpen] = useState(false);
    const [opencomp, setOpencomp] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [pItem, setpItem] = useState({});
    const [dia, setdia] = useState(false);
    const [Item, setItem] = useState([]);
    const [feedbackDetails, setFeedbackDetails] = useState([])
    // var date, time; 
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleOrderDetails = (item) => {
        // console.log(item)
        setpItem(item)

        setOpen(true);
    }
    const handleC = () => {
        setpItem({})
        setOpen(false)
    }
    const handleCancelOrder = (item) => {
        Swal.fire({
            title: 'Are you sure... you really want to cancel order',
            text: "If it's possible don't cancel it our workers really work hard to serve your service",
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#57FF00',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#FF4F00',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    id: item._id
                };
                axios.post(`http://localhost:5000/order/cancelOrder`, data)
                    .then((response) => {
                        if (response.data.message === true) {
                            Swal.fire({
                                title: 'Your Order Has Been Cancelled!',
                                text: 'Next Time Please Place Order According To Your Needs And Time',
                                icon: 'warning',
                                confirmButtonText: 'Got It'
                            }).then(() => {
                                window.location.href = '/Customer/CustOrder'
                            })
                        } else {
                            Swal.fire({
                                title: 'Something Went Wrong!',
                                text: 'Please Try Again Later',
                                icon: 'question',
                                confirmButtonText: 'Got It!'
                            })
                        }

                    });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thanks For Not Cancelling Your Order',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    const handlecompOrderDetails = (item) => {
        // console.log(item)
        setpItem(item)

        setOpencomp(true);
    }
    const handleCcomp = () => {
        setpItem({})
        setOpencomp(false)
    }




    const handleLogin = () => {
        window.location.href = "/Login"
    };
    const dialogStyles = {
        maxWidth: '1000px', // Set the maximum width as per your requirements
    };

    useEffect(() => {


        if (localStorage.getItem('role') != null) {
            setIsLoggedIn(true);
            const data = {
                _id: localStorage.getItem('id')
            };
            axios.post(`http://localhost:5000/employee/getEmployeeById`, data)
                .then((response) => {

                    if (response?.data[0]?.cart?.serList == '') {
                        setCartActive(false)

                    } else {
                        setCartActive(true)
                    }

                });

        }
    }, []);
    const data = {
        empId: localStorage.getItem('id')
    }
    useEffect(() => {
        axios.post(`http://localhost:5000/order/getHistoryByEmpId`, data)
            .then((response) => {
                console.log(response.data)

                setPending(response.data.history)

            })

    }, []);
    const HandleFeedback = (item) => {
        setdia(true);
        setItem(item);
        const data1 = {
            orderId: item._id
        }

        axios.post(`http://localhost:5000/feedback/getFeedbackByOrderId/`, data1)
            .then((response) => {
                console.log(response.data);
                setFeedbackDetails(response.data[0]);
            })

    }
    function mapRatingToLabel(rating) {
        switch (rating) {
            case 1:
                return 'Very Poor';
            case 2:
                return 'Poor';
            case 3:
                return 'Average';
            case 4:
                return 'Good';
            case 5:
                return 'Very Good';
            default:
                return 'Not Rated';
        }
    }
    const handleclosedia = () => {
        setdia(false);
        setItem([])
    }
    const paperStyle = {
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#ffb6c1',
        borderRadius: '10px',
        width: '150px',
        marginLeft: '20px',
        marginRight: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };

    return (
        <>
            {!isLoggedIn && (
                <div style={{ width: '100%', height: '500px' }}>

                    <img
                        src={img}
                        alt="Full Page Image"

                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    />
                    <Dialog open={isOpen} onClose={handleClose}>
                        <div style={{ padding: '16px' }}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Orders are only visible after logging in
                            </Typography>
                            <Typography variant="body1" component="div">
                                Please log in to view your orders and continue shopping.
                            </Typography>
                        </div>
                        <DialogActions>
                            <Button onClick={handleLogin} variant="contained" color="primary">
                                Login
                            </Button>
                            <Button onClick={handleClose} variant="outlined" color="error">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}

            {isLoggedIn && (





                <div className="container-fluid" style={{ backgroundColor: '#D4E6F1' }}>
                    <div className='col-md-12 justify-content-center' style={{ padding: 20 }}>


                        <div className="container-fluid" style={{ backgroundColor: '#FFFFF0' }}>
                            {/* <div className='col-md-11' style={{margin :'20'}}>  */}

                            <div className='col-md-12' style={{ padding: 20 }}>
                                {pending.length === 0 && Complete.length === 0 ? (
                                    <h1 style={{ textAlign: 'center' }}>No Schedules Yet : /</h1>
                                ) : (
                                    <>
                                        {pending.length === 0 ? <h1 style={{ textAlign: 'center' }}></h1> :
                                            pending.length !== 0 && (
                                                <>
                                                    <h1 style={{ textAlign: 'center' }}></h1>



                                                    {pending.map((item, index) => (

                                                        <div className='row mt-2'>


                                                            <div className='col-md-10'>
                                                                <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                                                                    <div className='row' style={{ marginTop: 20 }}>
                                                                        <div className="col-md-6">
                                                                            <img className="rounded" src={item?.serviceDetails[0]?.url} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                        </div>



                                                                        <div className='col-md-6' style={{ textAlign: 'left' }}>


                                                                            <h6 className="card-title"><strong>Order Id: </strong>{item.orderId}</h6>
                                                                            <h6 className="card-title"> <strong>Service Name: </strong>{item?.serviceDetails[0]?.name}</h6>

                                                                            <h6><strong>Total amount:</strong> ₹{item?.serviceDetails[0]?.price}</h6>
                                                                            <h6><strong>Status: </strong><span className={`text-${item.status === 'cancelled' ? 'danger' : item.status === ' Scheduled Today' ? 'warning' : 'success'}`}>{item.status}</span></h6>

                                                                            <h6>
                                                                                <strong>
                                                                                    Customer Name: </strong>{item?.customerDetails[0]?.fname} {item?.customerDetails[0]?.lname}
                                                                            </h6>


                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%', marginTop: "10px" }}>
                                                                        < Button onClick={() => handleOrderDetails(item)} style={{
                                                                            marginRight: "20px",
                                                                            color: 'white',
                                                                            padding: '10px 20px',
                                                                            borderRadius: '5px',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            fontSize: '16px'
                                                                        }} variant="contained" color="warning">Details</Button>
                                                                        < Button onClick={() => HandleFeedback(item)} style={{
                                                                            marginRight: "0px",
                                                                            color: 'white',
                                                                            padding: '10px 20px',
                                                                            borderRadius: '5px',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            fontSize: '16px'
                                                                        }} variant="contained" color="success">View Feedback</Button>

                                                                    </div>


                                                                    <div className="col-md-6" style={{ margin: 10 }}>


                                                                        <div className="row">
                                                                            <div className="col-md-8">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))}
                                                    <Dialog open={open} onClose={handleC} PaperProps={{ style: dialogStyles }} >
                                                        <DialogTitle style={{ color: "red" }}>Order Details</DialogTitle>
                                                        <DialogContent>
                                                            <p><strong>Order Id :</strong> {pItem.orderId}</p>
                                                            <DialogContentText>
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <img className="rounded" src={pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.url : ""} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                </div>
                                                                <br></br>

                                                                <h6><strong>Service name :</strong> {pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.name : ""}</h6>
                                                                <h6><strong>Total amount :</strong> ₹{pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.price : ""}</h6>
                                                                <h6><strong>Booked at :</strong>{pItem.booking_datetime}</h6>
                                                                <h6><strong>Service date :</strong>{pItem.service_date}</h6>
                                                                <h6><strong>  Service start at:</strong>{pItem.service_startTime}</h6>
                                                                <h6><strong>service ends on:</strong>{pItem.service_endTime}</h6>
                                                                <h6><strong> Payment mode:</strong>{pItem.payment_mode} </h6>
                                                                <h6><strong>Status: </strong><span className={`text-${pItem.status === 'cancelled' ? 'danger' : pItem.status === ' Scheduled Today' ? 'warning' : 'success'}`}>{pItem.status}</span></h6>
                                                                <p>
                                                                    <h6>

                                                                        <h6><strong>Customer Name: </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.fname : ""} {pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.lname : ""}</h6>
                                                                        <h6> <strong>Customer contact Number: </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.contact_no : ""} </h6>
                                                                        <h6> <strong>Customer House Number : </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.address[0]?.house_no : "he "} </h6>
                                                                        <h6> <strong>Customer Society Name : </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.address[0]?.society_name : ""} </h6>
                                                                        <h6> <strong>Customer Landmark : </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.address[0]?.landmark : ""} </h6>
                                                                        <h6> <strong>Customer City : </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.address[0]?.city : ""} </h6>
                                                                        <h6> <strong>Customer Pincode : </strong>{pItem?.customerDetails?.length > 0 ? pItem?.customerDetails[0]?.address[0]?.pincode : ""} </h6>
                                                                    </h6>


                                                                </p>
                                                            </DialogContentText>

                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleC} style={{
                                                                marginRight: "50px", backgroundColor: '#f96d00',
                                                                color: '#f2f2f2',
                                                                padding: '10px 20px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                fontSize: '16px'
                                                            }}>
                                                                Close
                                                            </Button>

                                                        </DialogActions>
                                                    </Dialog>
                                                    <Dialog open={dia} onClose={handleclosedia}>
                                                        <DialogContent>
                                                            <Card style={{ borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: "370px" }}>
                                                                <CardContent>
                                                                    <Grid container spacing={4} >
                                                                        <Grid item xs={5}>
                                                                            <Paper elevation={3} style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f0e68c', borderRadius: '10px', width: "150px", marginLeft: "10px" }}>
                                                                                <Typography variant="h6">Service Rating</Typography>
                                                                                <Rating
                                                                                    name="service-rating"
                                                                                    value={feedbackDetails?.serRating ||0 }
                                                                                    readOnly
                                                                                    max={5} // Specify the maximum rating value (in this case, 5)
                                                                                />
                                                                                <Typography variant="body1">
                                                                                    {mapRatingToLabel(feedbackDetails?.serRating)}
                                                                                </Typography>
                                                                            </Paper>
                                                                        </Grid>
                                                                        <Grid item xs={6}>
                                                                            <Paper elevation={3} style={paperStyle}>
                                                                                <Typography variant="h6">Employee Rating</Typography>
                                                                                <Box component="fieldset" borderColor="transparent">
                                                                                    <Typography variant="body1">
                                                                                        <Rating
                                                                                            name="employee-rating"
                                                                                            value={feedbackDetails?.empRating || 0}
                                                                                            readOnly
                                                                                            max={5}
                                                                                        />
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Typography variant="body1">
                                                                                    {mapRatingToLabel(feedbackDetails?.empRating)}
                                                                                </Typography>
                                                                            </Paper>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Box mt={2}>
                                                                        <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px' }}>
                                                                            <Typography variant="h6">Feedback</Typography>
                                                                            <Typography variant="body1">{feedbackDetails?.feed_text}</Typography>
                                                                        </Paper>
                                                                    </Box>
                                                                </CardContent>
                                                            </Card>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleclosedia} variant="outlined" color="error">
                                                                Close
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </>


                                            )}

                                    </>


                                )}
                            </div>
                        </div>
                    </div>


                </div>




            )}

        </>
    );
}

export default Today