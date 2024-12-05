import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import img from '../img/loginBlock.png'
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { BsTrash } from 'react-icons/bs';
import Employee from '../Admin-dashboard/Employee/Employee';
import md5 from 'md5'
const Home = (props) => {
  const [today, setToday] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [upcoming, setUpcoming] = useState(0);
  const [completed, setCompleted] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [order, setorder] = useState([]);
  // const []=useState(false);
  // const [empdata, empdatachange] = useState([])
  const [isOpen, setIsOpen] = useState(true);
  const [isOpendetails, setdetails] = useState(false);
  const [isOpenAdd, setadd] = useState(false);
  const [itemdetails, setitemdetails] = useState([]);
  const [itemComplete, setitemComplete] = useState([]);
  const [itemAdd, setitemAdd] = useState([]);
  const [iscomp, setclosecomp] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [Addon, setAddon] = useState([]);
  const [getAddon, setgetaddon] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  useEffect(() => {
    const data = {
      "empId": localStorage.getItem('id')
    };
    axios.post(`http://localhost:5000/employee/getTodaySchedules`, data)
      .then((response) => {
        if (response.data.length != 0) {
          setToday(response?.data?.length);
          console.log(response.data.length)
        } else {
          setToday(0)
        }
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/employee/getUpcomingSchedules`, data)
      .then((response) => {

        setUpcoming(response?.data?.length);
        console.log(response.data.length);
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/employee/completed`, data)
      .then((response) => {

        setCompleted(response?.data?.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/employee/avgRating`, data)
      .then((response) => {

        if (response?.data?.rating == -1)
          setAvgRating("-");
        else
          setAvgRating(response.data.rating);
        console.log(response.data.rating)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
  }, []);
  const handleLogin = () => {
    window.location.href = "/Login"
  };
  const dialogStyles = {
    maxWidth: '1000px', // Set the maximum width as per your requirements
  };


  useEffect(() => {


    if (localStorage.getItem('role') === md5("Employee")) {
      setIsLoggedIn(true);
    
      // axios.post(`http://localhost:5000/employee/getEmployeeById`, data)
      //   .then((response) => {

      //    if(response)
      //    setIsLoggedIn(true);
      //   else
      //   setIsLoggedIn(false);
      //   });

    }
  }, []);
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Fetch active services
    axios
      .post("http://localhost:5000/order/getActiveService")
      .then((response) => {
        console.log(response.data);
        setorder(response?.data);


        if (response?.data?.length > 0) {
          const data = {
            orderId: response.data[0]._id,
          };
          console.log(data)
          axios
            .post("http://localhost:5000/order/getAddOns", data)
            .then((response) => {
              console.log(response.data);
              setgetaddon(response.data.addOnList);
              setSubtotal(response.data.subtotal)
              console.log(response.data.subtotal)

            })
            .catch((addOnError) => {
              console.error('Error fetching add-ons:', addOnError);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching active services:', error);
      });
  }, []); //

  const handleOrderDetails = (item) => {
    setdetails(true);
    setitemdetails(item);
    try {


      axios.post("http://localhost:5000/order/getOrderById", item)
        .then((response) => {
          console.log(response.data)
          // setorder(response.data)
        })
    }
    catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
  const handleClosedetails = () => {
    setdetails(false);
    setitemdetails([])
  }
  const handleCompleted = (item) => {
    setclosecomp(true);
    setitemComplete(item)
    const data = {
      orderId: item._id,


    }
    try {


      axios.post("http://localhost:5000/order/sendOTP", data)
        .then((response) => {
          console.log("ok")


        })
    }
    catch (error) {
      console.error('Error fetching cart data:', error);
    }

  }
  const handleCloseComp = () => {
    setitemComplete([])
    setclosecomp(false);
  }

  const handleOTP = () => {
    setclosecomp(false);
    const data = {
      orderId: itemComplete._id
    }

    try {


      axios.post("http://localhost:5000/order/sendOTP", data)
        .then((response) => {

          if (response.status === 200) {
            // The OTP was successfully sent
            Swal.fire({
              title: 'OTP Sent Successfully',
              text: 'You should receive it shortly.',
              icon: 'success',
              confirmButtonText: 'Got It!'

            }).then(() => {

              setclosecomp(true)
            })


          } else {

            Swal.fire({
              title: 'Something Went Wrong!',
              text: 'Please Try Again Later',
              icon: 'error',
              confirmButtonText: 'Got It!'
            });
          }
        })
        .catch((error) => {
          console.error('Error sending OTP:', error);

          Swal.fire({
            title: 'Network Error',
            text: 'Please check your network connection and try again.',
            icon: 'error',
            confirmButtonText: 'Got It!'
          });
        });
    }
    catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
  const handleSubmit = () => {
    setclosecomp(false)
    const data = {
      orderId: itemComplete._id,
      otp: otpValue
    }
    try {


      axios.post("http://localhost:5000/order/completeOrder", data)
        .then((response) => {
          // console.log("ok")
          if (response.data.message) {

            Swal.fire({
              title: 'Order completed successfully.',
              text: 'Order is Completed',
              icon: 'success',
              confirmButtonText: 'Got It!'

            }).then(() => {

              window.location.href = "/Employee/"
            })


          } else {

            Swal.fire({
              title: 'Incorrect OTP. Please try again.',
              text: 'Please Try Again Later',
              icon: 'error',
              confirmButtonText: 'Got It!'
            });
          }



        })
    }
    catch (error) {
      console.error('Error fetching cart data:', error);
    }


  }
  const handleAddon = (item) => {
    setadd(true);
    setitemAdd(item)
    console.log(item)
    try {

      const data = {
        serId: item.serId
      };

      axios.post("http://localhost:5000/addOn/getAddOnBySerId", data)
        .then((response) => {
          console.log(response.data)

          setAddon(response.data.addOns);


        })
    }
    catch (error) {
      console.log(error)
    }

  }
  const closeadd = () => {
    setadd(false);
    setitemAdd([]);
  }
  const handleAddonadd = (item) => {
    setadd(false);

    const data = {

      addOnId: item._id,
      orderId: itemAdd._id


    }
    console.log(data)
    try {



      axios.post("http://localhost:5000/order/addAddons", data)
        .then((response) => {
          console.log(response.data)

          Swal.fire({
            title: 'Added successfully.',
            text: 'Added to service successfully',
            icon: 'success',
            confirmButtonText: 'Got It!'

          }).then(() => {

            window.location.href = "/Employee/"
          })


        })
    }
    catch (error) {
      console.log(error)
    }

  }
  // useEffect(() => {

  //   const data = {
  //     orderId: order[0]._id
  //   }

  //   try {


  //     axios.post("http://localhost:5000/order/getAddOns", data)
  //       .then((response) => {
  //         // console.log(response.data.addOnList)
  //         setgetaddon(response.data.addOnList)
  //       })
  //   }
  //   catch (error) {
  //     console.error('Error fetching cart data:', error);
  //   }

  // }, [])
  const handledeleteAddon = (item) => {
    const data = {
      addOnId: item?.addOnList?._id,
      orderId: order[0]._id

    }
    console.log(data)
    try {



      axios.post("http://localhost:5000/order/removeAddOns", data)
        .then((response) => {


          Swal.fire({
            title: 'Deleted successfully.',
            text: 'Deleted to service successfully',
            icon: 'success',
            confirmButtonText: 'Okay'

          }).then(() => {

            window.location.href = "/Employee/"
          })


        })
    }
    catch (error) {
      console.log(error)
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
          <Dialog open={isOpen} onClose={handleCloseComp}>
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
      {isLoggedIn &&
        <div className="right-content">
          <div className="centered-form" style={{ width: "100%", height: "100%" }}>
            <div className="card" style={{ width: "1100px", height: "100%", marginLeft: "2px", marginRight: "0px" }}>
              <h1> Welcome,User</h1>
              <div className="container">
                <div className="row">
                  <div className="col-sm" >
                    <div class="card bg-warning" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Schedules (Today)</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{today}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-danger" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Upcoming services</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{upcoming}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-success" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Completed</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{completed}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-primary" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Average Rating</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{avgRating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
          {/* --------- */}
          <div className="container-fluid" style={{ backgroundColor: '#D4E6F1' }}>
            <div className='col-md-12 justify-content-center' style={{ padding: 20 }}>

              <div className="container-fluid" style={{ backgroundColor: '#FFFFF0' }}>
                {/* <div className='col-md-11' style={{margin :'20'}}>  */}

                <div className='col-md-12' style={{ padding: 20 }}>
                  {order.length === 0 ? (
                    <h1 style={{ textAlign: 'center' }}>No Active Order</h1>
                  ) : (
                    order.map((item, index) => (
                      <div className='row mt-2'>
                        <div className='col-md-12'>
                          <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                            <div className='row' style={{ marginTop: 30 }}>
                              <div className="col-md-6">
                                <div className="d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
                                  <FontAwesomeIcon icon={faSpinner} spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
                                  <img
                                    className="rounded"
                                    src={item?.serviceDetails[0]?.url}
                                    style={{ width: "60%", zIndex: 0 }}
                                  />
                                </div>
                              </div>



                              <div className='col-md-6' style={{ textAlign: 'left' }}>


                                <p className="card-title"><strong>OrderId:</strong> {item.orderId}</p>
                                <p className="card-title"><strong>Service Start at:</strong> {item.service_startTime}</p>
                                <p className="card-title"><strong>Service end at:</strong> {item.service_endTime}</p>
                                <p className="card-title"><strong>Status of service:</strong> {item.status}</p>
                                <p className="card-title"><strong>Amount To Pay :</strong> {item.amount + subtotal}</p>
                              </div>
                            </div>
                            <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                              <button className="btn btn-primary" onClick={() => handleOrderDetails(item)} style={{ width: "auto", marginRight: "10px", marginBottom: "10px" }}> order Details</button>
                              <button className="btn btn-danger" onClick={() => handleAddon(item)} style={{ width: "auto", marginRight: "10px", marginBottom: "10px" }}> add to AddOn</button>
                              <button className="btn btn-success" onClick={() => handleCompleted(item)} style={{ width: "auto", marginRight: "10px", marginBottom: "10px" }}> Completed</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )))}

                  {order.length === 0 || getAddon.length === 0 ? (<></>

                  ) : (
                    <>
                      <h1 style={{ textAlign: 'center' }}> Addon Items</h1>
                      {getAddon?.map((item, index) => (
                        <div className='row mt-2'>
                          <div className='col-md-6'>
                            <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                              <div className='row' style={{ marginTop: 2, marginBottom: 2 }}>
                                <div className="col-md-6">
                                  <div className="d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
                                    {/* <FontAwesomeIcon icon={faSpinner} spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} /> */}
                                    <img
                                      className="rounded"
                                      src={item?.addOnList?.url}
                                      style={{ width: "40%", zIndex: 0 }}
                                    />
                                  </div>
                                </div>



                                <div className='col-md-6' style={{ textAlign: 'left' }}>



                                  <p className="card-title"><strong>Name</strong> {item?.addOnList?.name}</p>
                                  <p className="card-title"><strong>price:</strong> ₹{item?.addOnList?.price}</p>

                                  <div className='col-md-10' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <BsTrash onClick={() => handledeleteAddon(item)} style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }} />
                                  </div>
                                </div>


                              </div>

                            </div>
                          </div>
                        </div>
                      ))}
  </>
                      )}
                  

                </div>
              </div>
            </div>
          </div>

          <Dialog open={isOpendetails} onClose={handleClosedetails}>
            <div style={{ padding: '16px' }}>

              <DialogTitle style={{ color: "red" }}>Order Details</DialogTitle>
              <DialogContent>
                <p><strong>Order Id :</strong> {itemdetails.orderId}</p>
                <DialogContentText>
                  <div className="d-flex justify-content-center align-items-center">
                    <img className="rounded" src={itemdetails?.serviceDetails?.length > 0 ? itemdetails?.serviceDetails[0]?.url : ""} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                  </div>
                  <br></br>

                  <h6><strong>Service name :</strong> {itemdetails?.serviceDetails?.length > 0 ? itemdetails?.serviceDetails[0]?.name : ""}</h6>
                  <h6><strong>Total amount :</strong> ₹{itemdetails?.serviceDetails?.length > 0 ? itemdetails?.serviceDetails[0]?.price : ""}</h6>
                  <h6><strong>Booked at :</strong>{itemdetails.booking_datetime}</h6>
                  <h6><strong>Service date :</strong>{itemdetails.service_date}</h6>
                  <h6><strong>  Service start at:</strong>{itemdetails.service_startTime}</h6>
                  <h6><strong>service ends on:</strong>{itemdetails.service_endTime}</h6>
                  <h6><strong> Payment mode:</strong>{itemdetails.payment_mode} </h6>
                  <h6><strong> Status: </strong><span className="text-warning">{itemdetails.status}</span>  </h6>

                </DialogContentText>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosedetails} style={{
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
            </div>


          </Dialog>
          <Dialog open={iscomp} onClose={handleCloseComp}>
            <div style={{ padding: '16px' }}>
              <Typography variant="h5" component="div" gutterBottom>
                Enter OTP
              </Typography>
              <form>
                <TextField
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="otp"
                  id="otp"
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}


                />

                <DialogActions>
                  <Button variant="outlined" color="primary" onClick={handleOTP}>
                    Resend OTP
                  </Button>
                  <Button variant="contained" color="success" onClick={handleSubmit}>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </div>
          </Dialog>
          {/* ---------- */}
          <Dialog open={isOpenAdd} onClose={closeadd}>
            <DialogTitle>Addons items</DialogTitle>
            <DialogContent>
              {Addon &&
                Addon?.length === 0 ? (
                <h1>No add-On Items Found</h1>
              ) : (
                Addon?.map((item) => (
                  <div class="container mt-2" style={{ width: "290px" }} key={item._id}>

                    <div className="card">
                      <div className="row">
                        <div className="col-md-12">

                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="col-md-6">
                                  <img src={item.url} style={{ width: '50%' }} />
                                </div>
                                <div className="col-md-6">
                                  <h6 className="card-title mt-4 mb-4" >Name : {item.name}</h6>
                                </div>
                                <div className="col-md-6">
                                  <h6 className="card-title mt-4 mb-4"> Price : ₹{item.price}</h6>
                                </div>
                                <div className="container">

                                  <button className="bg-info" style={{ backgroundColor: "", marginTop: "20px", marginBottom: "20px", marginLeft: "100px", width: "100px" }} onClick={() => handleAddonadd(item)}>Add</button>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))
              )}
            </DialogContent>
            <DialogActions>

              <Button onClick={closeadd} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>





        </div>
      }
    </>
  );
}
export default Home;
