import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { useReducer } from 'react';
import NavBar from '../NavBar';
// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import { loadStripe } from '@stripe/stripe-js'

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { red } from '@mui/material/colors';
let count = 0;
const Cart = () => {
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [ash, setash] = useState(1);
    const [open, setOpen] = useState(false);
    const [Item, setItem] = useState([]);
    const [user, setUser] = useState({});
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [isCash, setIsCash] = useState(false);

    // const [custId,setCustId] = useState(localStorage.getItem("id"))
    // console.log(count)
    const handleClickOpen = (item) => {
        setItem(item)
        setOpen(true);
    };

    const handleClose = () => {
        setItem([])
        setOpen(false);
    };
    const customerId = localStorage.getItem("id");
    const id = {
        _id: localStorage.getItem("id")
    }

    var cartData
    useEffect(() => {
        // Replace with the actual customer ID
        // forceUpdate();

        axios.post("http://localhost:5000/Customer/Cart", { custId: customerId })
            .then((response) => {
                console.log(response.data)
                if (response.data.message === false) {
                    setIsCartEmpty(true)
                } else {
                    setIsCartEmpty(false)
                }
                cartData = response.data.cart.serList;
                console.log(cartData)
                fetchServiceDetails(cartData);
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });

    }, [ash]);
    const fetchServiceDetails = (cartData) => {
        const promises = cartData.map(async (item) => {
            try {
                const response = await axios.post("http://localhost:5000/service/getServiceById/", { serId: item.serId }); // Send serId in the body
                return {
                    ...item,
                    serviceDetails: response.data
                };
            } catch (error) {
                console.error('Error fetching service details:', error.response || error.message);
                return item; // Continue processing other items
            }
        });
    
        Promise.all(promises)
            .then((updatedCartData) => {
                console.log("Updated Cart Data:");
                console.log(updatedCartData);
                setCartItems(updatedCartData);
            })
            .catch((error) => {
                console.error('Error processing cart items:', error);
            });
    };
    


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const item of cartItems) {
            // Check if serviceDetails exists before accessing price
            if (item.serviceDetails && item.serviceDetails.price) {
                totalPrice += parseInt(item.serviceDetails.price, 10);
            } else {
                console.warn('Service details missing for item:', item);
            }
        }
        return totalPrice;
    };
    
    const [address, setAddress] = useState({
        house_no: "",
        society_name: "",
        landmark: "",
        city: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("here " + name, value)
        setAddress({ ...address, [name]: value });
    };


    const paymantDialog = (e) => {
        const { name, value } = e.target;
        console.log("here " + name, value)
        setAddress({ ...address, [name]: value });
    };

    const handlePaymantDialog = (e) => {
        setPaymentOpen(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any action with the address data here
        console.log("Address submitted:", address);
    };
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51O2WDWSDtYEklcYF04UfHkzAnWJGz2u8kHYHVeLk1ohRSl7M45wAfkTD4hHhey9QJo0BcrFzKSjwNGAXNFG3mVbK00TOVBPOVP");
        const body = {
            products: cartItems
        }
        const header = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:5000/order/createCheckout", {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        });
        const session = await response.json();
        
        cartItems.length = 0;
        setIsCartEmpty(true);
        const result = await stripe.redirectToCheckout({
            sessionId:session.id
        })
        
        if(result.error){
            console.log(result.error);
        }
    }

    const HandleRemove = async (item) => {
        const data = {
            custId: customerId,
            serId: item.serId,
            time: item.time,
            date: item.date
        };
    
        try {
            const response = await axios.post("http://localhost:5000/Customer/removeService", data);
            Swal.fire({
                title: 'Removed!',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then(() => {
                window.location.href = "/Customer/Cart/";
            });
        } catch (error) {
            console.error('Error removing service:', error.response?.data || error.message);
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.error || 'An error occurred while removing the service.',
                icon: 'error'
            });
        }
    };
    
    // const total = calculateTotalPrice();
    const handleOpenOrderDialog = () => {
        try {
            // Replace with the actual customer ID

            axios.post("http://localhost:5000/Customer/getCustomerById", id)
                .then((response) => {
                    setUser(response.data)
                    // const address = {
                    //     house_no: response.data[0].address[0].house_no,
                    //     society_name: response.data[0].address[0].society_name,
                    //     landmark: response.data[0].address[0].landmark,
                    //     pincode: response.data[0].address[0].pincode,
                    //     city : response.data[0].address[0].city   
                    // }
                    const address = response.data[0].address[0];
                    setAddress(address);
                })
        }
        catch (error) {
            console.error('Error fetching cart data:', error);
        }
        setOrderDialogOpen(true);
    };

    const handleCloseOrderDialog = () => {
        setOrderDialogOpen(false);
    };
    const payWithCash = async ()=>{
        setOrderDialogOpen(false);
        try {
            setIsCartEmpty(true)
            let lat = 0;
            let lng = 0;
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?postcode=` + address.pincode + `&type=postcode&format=json&apiKey=e61b88dd95644ef79521f24baa6fb8f4`)
                .then((result) => {
                    lat = result.data.results[0].lat;
                    lng = result.data.results[0].lon;
                })
            // console.log(lat +" " + lng)
            const placeOrderData = {
                custId: id._id,
                address: address,
                payment_method : "CASH",
                lat: lat,
                lng: lng
            }
            // console.log(placeOrderData)
            const response = await axios.post("http://localhost:5000/Order/createOrder", placeOrderData);
            if (response) {
                
                handleCloseOrderDialog();
                // setCartItems(null);
                
                console.log(response.data)
                if (response.data.code === 0) {
                    
                    localStorage.setItem("orderId",response.data.orderId);
                    console.log(cartItems);
                    
                    window.location.href = "/Customer/checkout/success";
                   
                    
                    // setPaymentOpen(true)
                } else {
                    Swal.fire({
                        title: 'workers are not available... for some services',
                        icon: 'warning',
                        text: "try to order one by one",
                        confirmButtonText: 'Okay'
                    })
                    const data = {
                        custId: id._id
                    }
                    // axios.post("http://localhost:5000/customer/removeCart", data);

                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    const handlePlaceOrder = async () => {
        setOrderDialogOpen(false);
        try {
            setIsCartEmpty(true)
            let lat = 0;
            let lng = 0;
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?postcode=` + address.pincode + `&type=postcode&format=json&apiKey=e61b88dd95644ef79521f24baa6fb8f4`)
                .then((result) => {
                    lat = result.data.results[0].lat;
                    lng = result.data.results[0].lon;
                })
            // console.log(lat +" " + lng)
            const placeOrderData = {
                custId: id._id,
                address: address,
                payment_method : "CREDIT-CARD",
                lat: lat,
                lng: lng
            }
            // console.log(placeOrderData)
            const response = await axios.post("http://localhost:5000/Order/createOrder", placeOrderData);
            if (response) {
                
                handleCloseOrderDialog();
                // setCartItems(null);
                
                console.log(response.data)
                if (response.data.code === 0) {
                    
                    localStorage.setItem("orderId",response.data.orderId);
                    console.log(cartItems);
                    if(isCash){
                        window.location.href = "/Customer/checkout/success";
                    }else{
                        await makePayment();
                    }
                    
                    // setPaymentOpen(true)
                } else {
                    Swal.fire({
                        title: 'workers are not available... for some services',
                        icon: 'warning',
                        text: "try to order one by one",
                        confirmButtonText: 'Okay'
                    })
                    const data = {
                        custId: id._id
                    }
                    // axios.post("http://localhost:5000/customer/removeCart", data);

                }
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <NavBar />
            <div className="container-fluid" style={{ backgroundColor: '#D4E6F1' }}>
                <div className="col-md-12 justify-content-center" style={{ padding: 20 }}>
                    <div className="container-fluid" style={{ backgroundColor: '#FFFFF0' }}>
                        <div className='col-md-12' style={{ padding: 20 }}>
                            {cartItems.length === 0 ? (
                                <h1 style={{ textAlign: 'center' }}>Cart is Empty</h1>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div className='row mt-2' key={index}>
                                        <div className='col-md-8'>
                                            <div className="card" style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                                                <div className='row' style={{ marginTop: 20 }}>
                                                    <div className="col-md-6">
                                                        {/* Safeguard URL access with optional chaining */}
                                                        <img
                                                            className="rounded"
                                                            src={item?.serviceDetails?.url || "default-placeholder.jpg"} // Fallback image
                                                            alt={item?.serviceDetails?.name || "Service Image"} // Fallback alt text
                                                            style={{ width: "50%", textAlign: "center", paddingLeft: 20 }}
                                                        />
                                                    </div>
                                                    <div className='col-md-6' style={{ textAlign: 'left' }}>
                                                        <p className="card-title">
                                                            {item?.serviceDetails?.name || "Service Name Not Available"} {/* Safeguard with fallback */}
                                                        </p>
                                                        <p style={{ textAlign: 'left' }}>
                                                            Price: ₹{item?.serviceDetails?.price || "N/A"} {/* Fallback for price */}
                                                        </p>
                                                        <p>
                                                            Want on: {item?.date || "N/A"} at: {item?.time || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                                                    <button className="btn btn-danger" style={{ width: 50 }} onClick={() => HandleRemove(item)}> <BsTrash /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {!isCartEmpty && (
                                <div className="col-md-12 align-content-right">
                                    <div className="col-md-11 mt-8 d-flex justify-content-end align-items-end">
                                        <div className="card" style={{ height: "auto", marginBottom: "50px", textAlign: "center" }}>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ textAlign: "center" }}>Total Amount</h5>

                                                {cartItems.map((item, index) => (
                                                    <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <p style={{ textAlign: "left", marginRight: "15px" }}>{item?.serviceDetails?.name || "Unnamed Service"}: </p>
                                                        <p style={{ textAlign: "right" }}>₹{item?.serviceDetails?.price || "N/A"}</p>
                                                    </div>
                                                ))}
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p style={{ textAlign: "left", marginRight: "15px" }}>Total: </p>
                                                    <p style={{ textAlign: "right" }}>₹{calculateTotalPrice()}</p>
                                                </div>

                                                <Button
                                                    style={{ width: "150px", justifyContent: "center" }}
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={handleOpenOrderDialog}
                                                >
                                                    Place Order
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Dialog */}
                    <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog}>
                        <DialogTitle>Place Order</DialogTitle>
                        <DialogContent>
                            Confirm your address
                            <DialogContentText>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <TextField
                                        label="House Number"
                                        name="house_no"
                                        value={address.house_no || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Society"
                                        name="society_name"
                                        value={address.society_name || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Landmark"
                                        name="landmark"
                                        value={address.landmark || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="City"
                                        name="city"
                                        value={address.city || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Pincode"
                                        name="pincode"
                                        value={address.pincode || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </form>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handlePlaceOrder} variant="contained" color="success">
                                Online Payment
                            </Button>
                            <Button onClick={payWithCash} variant="contained" color="warning">
                                Cash Payment
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Cart;