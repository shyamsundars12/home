
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import md5 from 'md5';
import img from '../AdminLock.jpg';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const rowsPerPageOptions =  [8,10,15];

const Customer = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
  
  
      if (localStorage.getItem('role') === md5("Admin")) {
        setIsLoggedIn(true);
    
      }
    }, []);
    const handleClose =() =>{
      setIsOpen(false);
    }
    const handleLogin =() =>{
      window.location.href="/login"
    }
    useEffect(() => {


        if (localStorage.getItem('role') === md5("Admin")) {
          setIsLoggedIn(true);
               
    
        }
      }, []);
 
   
    const [empdata, empdatachange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };


   

    const Removefunction = (id) => {
        const data = {
            _id: id
        };
        if (window.confirm('Do you want to inActive the Customer?')) {
            axios.post(`http://localhost:5000/customer/deleteCustomer`, data)
                .then((response) => {
                    // Set the fetched customer data in the state
                    // setCustomers(response.data);
                    console.log(response.data)
                    //   Fetc();
                    axios.post(`http://localhost:5000/customer/getCustomer`)
                        .then((response) => {
                            // Set the fetched customer data in the state
                            // setCustomers(response.data);
                            // console.log(response.data)
                            empdatachange(response.data);
                        })
                        .catch((error) => {
                            // Handle any errors here
                            console.error('Error fetching customer data:', error);
                        });
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error fetching customer data:', error);
                });
        }
    }
    const Activefunction = (id) => {
        const data = {
            _id: id
        };
        if (window.confirm('Do you want to Active the Customer?')) {
            axios.post(`http://localhost:5000/customer/activeCustomer`, data)
                .then((response) => {
                    // Set the fetched customer data in the state
                    // setCustomers(response.data);
                    console.log(response.data)
                    //   Fetc();
                    axios.post(`http://localhost:5000/customer/getCustomer`)
                        .then((response) => {
                            // Set the fetched customer data in the state
                            // setCustomers(response.data);
                            // console.log(response.data)
                            empdatachange(response.data);
                        })
                        .catch((error) => {
                            // Handle any errors here
                            console.error('Error fetching customer data:', error);
                        });
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error fetching customer data:', error);
                });
        }
    }




        useEffect(() => {
    
            axios.post(`http://localhost:5000/customer/getCustomer`)
                .then((response) => {
            
                    empdatachange(response.data);
                })
                .catch((error) => {
                
                    console.error('Error fetching customer data:', error);
                });
        }, []);

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
      {isLoggedIn && 

        <div className="container" style={{ backgroundColor: "#000" }}>
            <div className="left-sidebar">

                <Sidebar></Sidebar>
            </div>
            <div className="right-content" >
                <div className="centered-form" style={{width:"900px",height:"100%"}}>
                    <div className="card" style={{ width: "1100px",height:"100%" , marginLeft:"3px",marginRight:"0px"}}>
                        <div className="card-title" style={{ marginLeft: "300px"}} >
                            <h2>Customer Listing</h2>
                        </div>
                        <div className="card-body" >
                            <div className="divbtn">
                                <Link to="/Admin/AddCustomer" className="btn btn-success">Add New (+)</Link>
                            </div>
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Phone</td>
                                        {/* <td>Status</td> */}
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        empdata && empdata
                                          
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item,index) => (
                                                <tr key={item._id}>
                                                    <td >{page * rowsPerPage + index + 1}</td>
                                                    <td>{item.fname} {item.lname}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.contact_no}</td>
                                               

                                                    <td><Link to={'/Admin/EditCustomer/' + item._id} className="btn btn-success"style={{marginLeft:"5px"}}>Edit</Link>
                                                        
                                                       
                                                        
                                                        <Link to={'/Admin/DetailCustomer/' + item._id} className="btn btn-primary" style={{marginLeft:"5px"}}>Details</Link>
                                                       {item.status === 'inactive' && <a onClick={() => { Activefunction(item._id) }} className="btn btn-danger"style={{marginLeft:"5px"}}>Active</a>}
                                                       {item.status === 'active'  && <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"style={{marginLeft:"5px"}}>InActive</a>}
                                                    </td>
                                                </tr>
                                            )
                                            )
                                    }

                                </tbody>

                            </table>
                            <div className="fluid-container" style={{width:"600px",height:"10%"}}>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    component="div"
                                    count={empdata
                                        .length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}
        </>


    );
}
export default Customer;
