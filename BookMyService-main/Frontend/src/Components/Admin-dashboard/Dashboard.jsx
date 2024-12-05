import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.css';
import img from '../img/AdminLock.jpg'
import md5 from 'md5'
const Dashboard = () => {
  const [eopen, setopenemp] = useState(false);
  const [eitem, esetitem] = useState({});
  const [sopen, setopenser] = useState(false);
  const [sitem, ssetitem] = useState({});
  const [copen, setopencust] = useState(false);
  const [citem, csetitem] = useState({});
  const [oopen, setopenord] = useState(false);
  const [oitem, osetitem] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const bigCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: "10px"
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const cardStyle = {
    flex: 1,
    margin: '10px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0074d9',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  const [count, setcount] = useState(0);
  const [incount, insetcount] = useState(0);
  const [emp, setemp] = useState(0)
  const [inemp, setinemp] = useState(0)
  const [Order, setOrder] = useState([])

  // const [empdata, empdatachange] = useState([])
  useEffect(() => {

    axios.post(`http://localhost:5000/customer/getActiveCustomer`)
      .then((response) => {

        setcount(response.data.length);
        console.log(response.data.length)

      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/customer/getInActiveCustomer`)
      .then((response) => {

        insetcount(response.data.length);
        // console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/Employee/getActiveEmployee`)
      .then((response) => {

        setemp(response.data.length);
        // console.log(response.data.length)

      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/Employee/getInActiveEmployee`)
      .then((response) => {

        setinemp(response.data.length);
        // console.log(response.data.length)

      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });


  }, []);
  useEffect(() => {
    axios.post(`http://localhost:5000/order/getActiveService`)
      .then((response) => {

        console.log(response.data)
        setOrder(response.data)


      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleEmployee = (item) => {
    setopenemp(true);

    esetitem(item);




  }
  const handleClosee = () => {

    setopenemp(false)
    esetitem(null);

  }
  const handleServices = (item) => {
    setopenser(true);
    ssetitem(item)


  }
  const handleCloses = () => {
    setopenser(false);
    ssetitem({})
  }
  const handleCustomer = (item) => {
    setopencust(true);
    csetitem(item)

  }
  const handleClosec = () => {
    setopencust(false);
    csetitem({})
  }
  const handleorder = (item) => {
    setopenord(true);
    osetitem(item)


  }
  const handleCloseo = () => {
    setopenord(false);
    osetitem({})
  }
 const handleLogin = () =>{
    window.location.href="/login";
 }
 useEffect(() => {


  if (localStorage.getItem('role') === md5("Admin")) {
    setIsLoggedIn(true);
  
 

  }
}, []);




  return (
    <div>
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
              Access to the admin section is restricted
              </Typography>
              <Typography variant="body1" component="div">
              Please ensure you have the appropriate permissions to access this area.
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
      {isLoggedIn &&
      <div className="container" style={{ backgroundColor: "#000" }}>
        <div className="left-sidebar" >

          <Sidebar></Sidebar>
        </div>
        <div className="right-content">
          <div className="centered-form" style={{ width: "100%", height: "100%" }}>
            <div className="card" style={{ width: "1100px", height: "100%", marginLeft: "2px", marginRight: "0px" }}>
              <h1> Welcome,User</h1>
              <div className="container">
                <div className="row">
                  <div className="col-sm" >
                    <div class="card bg-warning" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Total Number of Active Customer</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{count}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-danger" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Total Number of InActive Customer</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{incount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-success" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Total number of Active Employee</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{emp}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-primary" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Total number of InActive Employee</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{inemp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {Order.length === 0 ? (
                <h1 style={{color:"red" ,textAlign:"center",marginTop:"20px"}} >No Live Order</h1>
              ) : (
                <>
                <h1 style={{color:"red" ,textAlign:"center",marginTop:"20px"}}>Live Orders</h1>

                {Order.map((item) => (

                  <div key={item.orderId} style={bigCardStyle}>
                    <h2>OrderId: {item.orderId}</h2>
                    <div style={containerStyle}>
                      <div style={cardStyle}>
                        <h3>Employee Details</h3>

                        <p>Name: {item?.employeeDetails[0]?.fname}{item?.employeeDetails[0]?.lname}</p>
                        <p>Phone No.: {item?.employeeDetails[0]?.contact_no}</p>
                        <button onClick={() => handleEmployee(item?.employeeDetails[0])} style={buttonStyle}>Employee Details</button>
                      </div>
                      <div style={cardStyle}>


                        <img style={{ height: 100, width: 140 }} src={item.serviceDetails[0].url} />
                        <h6>Service Name :{item.serviceDetails[0].name}</h6>
                        <button style={buttonStyle} onClick={() => handleServices(item?.serviceDetails[0])}>Service Details</button>
                      </div>
                      <div style={cardStyle}>
                        <h3>Customer Details</h3>

                        <p>Customer Name: {item.customerDetails[0].fname} {item.customerDetails[0].lname}</p>
                        <p>Contact no.: {item.customerDetails[0].contact_no}</p>
                        <button style={buttonStyle} onClick={() => handleCustomer(item?.customerDetails[0])} >Customer Details</button>
                      </div>
                    </div>
                    <button className="btn bg-warning" style={{ width: 100 }} onClick={() => handleorder(item)}>
                      Order Details
                    </button>
                  </div>
                ))}</>
              )
              }



            </div>
            {eopen && <Dialog open={eopen} onClose={handleClosee}>
              <div style={{ padding: '16px' }}>
                <h1> Employee Details</h1>
                <strong>First Name:</strong> {eitem?.fname}<br />
                <strong>Last Name:</strong> {eitem?.lname}<br />
                <strong>Email:</strong> {eitem?.email}<br />
                <strong>Contact:</strong> {eitem?.contact_no}<br />
                <strong>House Number:</strong> {eitem?.address?.length > 0 ? eitem?.address[0]?.house_no : "N/A"}<br />
                <strong>Street Name:</strong> {eitem?.address?.length > 0 ? eitem?.address[0]?.society_name : "N/A"}<br />
                <strong>Landmark:</strong> {eitem?.address?.length > 0 ? eitem?.address[0]?.landmark : "N/A"}<br />
                <strong>City:</strong>{eitem?.address?.length > 0 ? eitem?.address[0]?.city : "N/A"}<br />
                <strong>Pincode:</strong> {eitem?.address?.length > 0 ? eitem?.address[0]?.pincode : "N/A"}<br />
                <strong>Lat :</strong> {eitem?.address?.length > 0 ? eitem?.address[0]?.lat : "N/A"}<br />
                <strong>Lng :</strong> {eitem?.address?.length > 0 ? eitem?.address[0]?.lng : "N/A"}<br />

                <strong>Rating:</strong> {eitem.rating}<br />
              </div>
              <DialogActions>

                <Button onClick={handleClosee} variant="contained" color="error">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            }
            {sopen && <Dialog open={sopen} onClose={handleCloses}>
              <Card style={{ width: '400px', margin: '0 auto', marginTop: "20px" }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Card.Img variant="top" src={sitem.url} style={{ width: 150 }} />
                </div> <Card.Body>
                  <Card.Title>{sitem.name}</Card.Title>
                  <p><strong>Price : </strong>₹{sitem.price}</p>

                  <p><strong>Average Rating: </strong>{sitem.avgRating}</p>
                  <p><strong>Description: </strong> {sitem.desc}</p>
             

                  <Button onClick={handleCloses} variant="contained" color="error">
                    Close
                  </Button>
                </Card.Body>
              </Card>

            </Dialog>
            }
            {copen && <Dialog open={copen} onClose={handleClosec}>
              <div style={{ padding: '16px' }}>
                <h1> Customer Details</h1>
                <strong>First Name:</strong> {citem.fname}<br />
                <strong>Last Name:</strong> {citem.lname}<br />
                <strong>Email:</strong> {citem.email}<br />
                <strong>Password:</strong> {citem.password}<br />
                <strong>Contact:</strong> {citem.contact_no}<br />
                <strong>House Number:</strong> {citem?.address?.length > 0 ? citem.address[0].house_no : "N/A"}<br />
                <strong>Street Name:</strong> {citem?.address?.length > 0 ? citem.address[0].society_name : "N/A"}<br />
                <strong>Landmark:</strong> {citem?.address?.length > 0 ? citem.address[0].landmark : "N/A"}<br />
                <strong>City:</strong> {citem?.address?.length > 0 ? citem.address[0].city : "N/A"}<br />
                <strong>Pincode:</strong> {citem?.address?.length > 0 ? citem.address[0].pincode : "N/A"}<br />

                <strong>Status:</strong> {citem.status}<br />
              </div>
              <DialogActions>

                <Button onClick={handleClosec} variant="contained" color="error">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            }
            {oopen && <Dialog open={oopen} onClose={handleClosec}>
              <div style={{ padding: '16px' }}>
                <h1> Order Details</h1>
                <p><strong>Order Id :</strong> {oitem.orderId}</p>
                <h6><strong>Booked at :</strong>{oitem.booking_datetime}</h6>
                <h6><strong>Service date :</strong>{oitem.service_date}</h6>
                <h6><strong>  Service start at:</strong>{oitem.service_startTime}</h6>
                <h6><strong>service ends on:</strong>{oitem.service_endTime}</h6>
                <h6><strong> Payment mode:</strong>{oitem.payment_mode} </h6>
                <h6><strong>Status: </strong><span className={`text-${oitem.status === 'cancelled' ? 'danger' : oitem.status === ' Scheduled Today' ? 'warning' : 'success'}`}>{oitem.status}</span></h6>

              </div>
              <DialogActions>

                <Button onClick={handleCloseo} variant="contained" color="error">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            }
          </div>

        </div>
      </div>}
    </div>

  );
}
export default Dashboard