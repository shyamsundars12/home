
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';

const rowsPerPageOptions = [8,10,15];

const Employee = () => {
 
   
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
        if (window.confirm('Do you want to inActive the Employee?')) {
            axios.post(`http://localhost:5000/employee/deleteEmployee`, data)
                .then((response) => {
                    // Set the fetched customer data in the state
                    // setCustomers(response.data);
                    console.log(response.data)
                    //   Fetc();
                    axios.post(`http://localhost:5000/employee/getEmployee`)
                        .then((response) => {
                            // Set the fetched customer data in the state
                            // setCustomers(response.data);
                            // console.log(response.data)
                            empdatachange(response.data);
                        })
                        .catch((error) => {
                            // Handle any errors here
                            console.error('Error fetching Employee data:', error);
                        });
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error fetching Employee data:', error);
                });
        }
    }
    const Activefunction = (id) => {
        const data = {
            _id: id
        };
        if (window.confirm('Do you want to Active the employee?')) {
            axios.post(`http://localhost:5000/employee/activeEmployee`, data)
                .then((response) => {
                    // Set the fetched customer data in the state
                    // setCustomers(response.data);
                    console.log(response.data)
                    //   Fetc();
                    axios.post(`http://localhost:5000/employee/getEmployee`)
                        .then((response) => {
                            // Set the fetched customer data in the state
                            // setCustomers(response.data);
                            // console.log(response.data)
                            empdatachange(response.data);
                        })
                        .catch((error) => {
                            // Handle any errors here
                            console.error('Error fetching employee data:', error);
                        });
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error fetching Employee data:', error);
                });
        }
    }




    useEffect(() => {
  
        axios.post(`http://localhost:5000/Employee/getEmployee`)
            .then((response) => {
        
                empdatachange(response.data);
            })
            .catch((error) => {
              
                console.error('Error fetching employee data:', error);
            });
    }, []);

    return (

        <div className="container" style={{ backgroundColor: "#000" }}>
            <div className="left-sidebar">

                <Sidebar></Sidebar>
            </div>
            <div className="right-content" >
                <div className="centered-form" style={{width:"900px",height:"100%"}}>
                    <div className="card" style={{ width: "1100px",height:"100%" , marginLeft:"3px",marginRight:"0px" }}>
                        <div className="card-title" style={{ marginLeft: "300px"}} >
                            <h2>Employee Listing</h2>
                        </div>
                        <div className="card-body" >
                            <div className="divbtn">
                                <Link to="/Admin/AddEmployee" className="btn btn-success">Add New (+)</Link>
                            </div>
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Phone</td>
                                        <td>Rating</td>
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
                                                    <td>{item.rating}</td>
                                               

                                                    <td><Link to={'/Admin/EditEmployee/' + item._id} className="btn btn-success"style={{marginLeft:"5px"}}>Edit</Link>
                                                        
                                                       
                                                        
                                                        <Link to={'/Admin/DetailEmployee/' + item._id} className="btn btn-primary" style={{marginLeft:"5px"}}>Details</Link>
                                                       {item.isActive === false && <a onClick={() => { Activefunction(item._id) }} className="btn btn-danger"style={{marginLeft:"5px"}}>Active</a>}
                                                       { item.isActive === true  && <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"style={{marginLeft:"5px"}}>InActive</a>}
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


    );
}
export default Employee;
