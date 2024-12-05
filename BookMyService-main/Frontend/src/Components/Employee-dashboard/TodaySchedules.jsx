import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import img from '../img/loginBlock.png'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { BsTrash,BsHeartFill } from 'react-icons/bs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaShoppingCart } from 'react-icons/fa';


const Today = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartActive, setCartActive] = useState(false)
    const [Complete, setComplete] = useState([]);
    const [pending, setPending] = useState([]);
    // const [cartItems, set] = useState([]);
    const [open, setOpen] = useState(false);
    const [opencomp, setOpencomp] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [pItem, setpItem] = useState({});
    const{setActiveHomeState,setToday}=props
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
        axios.post(`http://localhost:5000/order/getOrderTodayByEmpId`, data)
            .then((response) => {
                console.log(response.data)
                // console.log(response.data.pendingOrders)
                // console.log(response.data.completedOrders)
                setPending(response.data.pendingOrders)
                // setComplete(response.data.pendingOrders)
            })

    }, []);
    const handleActive=(item)=>{
        // console.log(item);
        const data ={
            orderId : item._id
        }
        try {


            axios.post("http://localhost:5000/order/activeService",data)
                .then((response) => {
                    console.log(response)
                    setActiveHomeState(true);
                    setToday(false);
                 
                })
        }
        catch (error) {
            console.error('Error fetching cart data:', error);
        }

       
        
    }



    return (
        <>
            {!isLoggedIn && (
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <img
                        src={img}
                        alt="Full Page Image"

                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    />
                    <Dialog open={isOpen} onClose={handleClose}>
                        <div style={{ padding: '16px' }}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Employee Must have to do login
                            </Typography>
                            <Typography variant="body1" component="div">
                                Please log in to view your orders and details.
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

                                                                            <h6><strong> Status: </strong><span className="text-warning">Scheduled Today</span>  </h6>
                                                                            <h6>
                                                                                <strong>
                                                                                    Customer Name: </strong>{item?.customerDetails[0]?.fname} {item?.customerDetails[0]?.lname}
                                                                            </h6>


                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                                                                     
                                                                            < Button onClick={() => handleOrderDetails(item)} style={{
                                                                                marginRight: "50px", backgroundColor: '#007bff',
                                                                                color: 'white',
                                                                                padding: '10px 20px',
                                                                                borderRadius: '5px',
                                                                                border: 'none',
                                                                                cursor: 'pointer',
                                                                                fontSize: '16px'
                                                                            }} variant="contained" color="warning">Order Details</Button>
                                                                                < Button onClick={() => handleActive(item)} style={{
                                                                                marginRight: "50px", backgroundColor: '#ff0000',
                                                                                color: 'white',
                                                                                padding: '10px 20px',
                                                                                borderRadius: '5px',
                                                                                border: 'none',
                                                                                cursor: 'pointer',
                                                                                fontSize: '16px'
                                                                            }} variant="contained" color="warning">
                                                                                Active
                                                                            </Button>

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
                                                                        <h6><strong> Status: </strong><span className="text-warning">Pending</span>  </h6>
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
                                                        </>


                                                    )}
                                                    {Complete && Complete?.length === 0 ? <h1 style={{ textAlign: 'center' }}></h1> :


                                                        Complete?.length !== 0 && (
                                                            <>
                                                                {/* <h1 style={{ textAlign: 'center' }}></h1> */}



                                                                {Complete.map((item, index) => (

                                                                    <div className='row mt-2'>


                                                                        <div className='col-md-8'>
                                                                            <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                                                                                <div className='row' style={{ marginTop: 20 }}>
                                                                                    <div className="col-md-6">
                                                                                        <img className="rounded" src={item?.serviceDetails[0]?.url} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                                    </div>



                                                                                    <div className='col-md-6' style={{ textAlign: 'left' }}>


                                                                                        <h6 className="card-title"><strong>Order Id: </strong>{item.orderId}</h6>
                                                                                        <h6 className="card-title"> <strong>Service Name: </strong>{item?.serviceDetails[0]?.name}</h6>

                                                                                        <h6><strong>Total amount:</strong> ₹{item?.serviceDetails[0]?.price}</h6>

                                                                                        <h6><strong> Payment mode: </strong>{item.payment_mode}  </h6>
                                                                                        {item.status == 'cancelled' ? <h6><strong> Status: </strong><span className="text-danger">Cancelled</span>  </h6>
                                                                                            : <h6><strong> Status: </strong><span className="text-success">Completed</span>  </h6>

                                                                                        }





                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                                                                                    < Button onClick={() => handlecompOrderDetails(item)} style={{
                                                                                        marginRight: "50px", backgroundColor: '#007bff',
                                                                                        color: '#f2f2f2',
                                                                                        padding: '10px 20px',
                                                                                        borderRadius: '5px',
                                                                                        border: 'none',
                                                                                        cursor: 'pointer',
                                                                                        fontSize: '16px'
                                                                                    }} variant="contained" color="warning">Order Details</Button>

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
                                                                <Dialog open={opencomp} onClose={handleCcomp} PaperProps={{ style: dialogStyles }} >
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

                                                                            {pItem.status == 'cancelled' ? <h6><strong> Status: </strong><span className="text-danger">Cancelled</span>  </h6>
                                                                                : <h6><strong> Status: </strong><span className="text-success">Completed</span>  </h6>

                                                                            }

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
                                                                        <Button onClick={handleCcomp} style={{
                                                                            marginRight: "50px", backgroundColor: '#f96d00',
                                                                            color: 'white',
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