import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";

import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

const rowsPerPageOptions =  [8,10,15];

const EmpSer = () => {
 

    const [open, setOpen] = useState(false);
    const [openrem, setOpenrem] = useState(false);
    const [opendet, setOpendet] = useState(false);
    const [SelectEmp, setEmp] = useState({})
    const [SelectEmprem, setEmprem] = useState({})
    const [SelectEmpdet, setEmpdet] = useState({})
    //   const services = [ /* Your list of services goes here */ ];
    const [services, setService] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [employeeServices, setEmployeeServices] = useState([]);
    const [employeeServicesrem, setEmployeeServicesrem] = useState([]);
    const [employeeServicesdet, setEmployeeServicesdet] = useState([]);

    const HandleOpen = (item) => {
        // console.log(item)
        setEmp(item)
        setOpen(true);
        try {

            axios.post("http://localhost:5000/empser/getEmpSerByEmpId/", item)
                .then((response) => {
                    console.log(response.data);
                    setEmployeeServices(response.data);



                })
        }
        catch (error) {

        }
    }
    
        const handleClose = () => {
            setEmp('')
            setOpen(false);
        };

    const HandleOpenRem = (item) => {
      
        setEmprem(item)
        setOpenrem(true);
        try {

            axios.post("http://localhost:5000/empser/getEmpSerByEmpId/", item)
                .then((response) => {
                    console.log(response.data);
                    setEmployeeServicesrem(response.data);



                })
        }
        catch (error) {

        }
    }

    const handleCloserem = () => {
        setEmprem('')
        setOpenrem(false);
    };
    const HandleDelete =(item) =>{
        handleCloserem()
        const datarem={
            empId:SelectEmprem._id,
            serId:item._id
        }
        try {

            axios.post("http://localhost:5000/empser/removeService/", datarem)
                .then((response) => {
                    
            
                Swal.fire({
                    title: 'Deleted Successfully',
                    icon: 'success',
                    text: "",
                    confirmButtonText: 'Okay'
                }).then(() => {
                   
                   window.location.href="/admin/EmpSer"
                })



                })
        }
        catch (error) {
            console.log(error)

        }

    }
    // -----------
    const HandleOpendet = (item) => {
      
        setEmpdet(item)
        setOpendet(true);
        try {

            axios.post("http://localhost:5000/empser/getEmpSerByEmpId/", item)
                .then((response) => {
                    console.log(response.data);
                    setEmployeeServicesdet(response.data);



                })
        }
        catch (error) {

        }
    }

    const handleClosedet = () => {
        setEmpdet('')
        setOpendet(false);
    };
   



    const handleADDservices = (item)=>{
        handleClose()
        
        const data={
            empId:SelectEmp._id,
            serId:item._id
        }
        try {

            axios.post("http://localhost:5000/empser/addService/", data)
                .then((response) => {
                console.log(response.data);
                Swal.fire({
                    title: 'Added Successfully',
                    icon: 'success',
                    text: "",
                    confirmButtonText: 'Okay'
                }).then(() => {
                   
                   window.location.href="/admin/EmpSer"
                })



                })
        }
        catch (error) {

        }


    }





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
    useEffect(() => {

        axios.post('http://localhost:5000/service/getService')
            .then((response) => {
                console.log(response.data);
                setService(response.data);
            })
            .catch((error) => {

                console.error('Error fetching customer data:', error);
            });
    }, []);



    





    useEffect(() => {

        axios.post('http://localhost:5000/Employee/getEmployee')
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
                <div className="centered-form" style={{ width: "900px", height: "100%" }}>
                    <div className="card" style={{ width: "1100px", height: "100%", marginLeft: "3px", marginRight: "0px" }}>
                        <div className="card-title" style={{ marginLeft: "300px" }} >
                            <h2>Employee Listing</h2>
                        </div>
                        <div className="card-body" >
                           
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Phone</td>

                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody style={{ marginRight: "0px", textAlign: "center" }}>

                                    {
                                        empdata && empdata

                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <tr key={item._id}>
                                                    <td >{page * rowsPerPage + index + 1}</td>
                                                    <td>{item.fname} {item.lname}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.contact_no}</td>



                                                    <td ><button onClick={() => HandleOpen(item)} className="btn btn-success" style={{ marginLeft: "5px" }}>Add Service</button>



                                                    <button onClick={() => HandleOpenRem(item)} className="btn btn-danger" style={{ marginLeft: "5px" }}>Remove Service</button>
                                                    <button onClick={() => HandleOpendet(item)} className="btn btn-primary" style={{ marginLeft: "5px" }}>Details</button>
                                                       
                                                        {/* { item.status === 'active'  && <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"style={{marginLeft:"5px"}}>InActive</a>} */}
                                                    </td>
                                                </tr>
                                            )
                                            )
                                    }

                                </tbody>

                            </table>
                            <div className="fluid-container" style={{ width: "600px", height: "10%" }}>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select Service</DialogTitle>
                <DialogContent>
                    {employeeServices &&
                        employeeServices?.nonExistingSer?.length === 0 ? (
                        <h1>It has all Services</h1>
                    ) : (
                        employeeServices?.nonExistingSer?.map((item) => (
                            <div class="container mt-5" key={item._id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={item.url} className="img-fluid" alt={item.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <h2 className="card-title mt-2">{item.name}</h2>
                                            <div className="container">
                                                
                                            <h3>₹{item.price}</h3>
                                            <button onClick={()=>handleADDservices(item)}  className = "bg-warning"style={{backgroundColor:"",marginLeft:"100px",width:"90px" }}>add</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openrem} onClose={handleCloserem}>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogContent>
                    {employeeServicesrem &&
                        employeeServicesrem?.existingSer?.length === 0 ? (
                        <h1>It has No Services</h1>
                    ) : (
                        employeeServicesrem?.existingSer?.map((item) => (
                            <div class="container mt-5" key={item._id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={item.url} className="img-fluid" alt={item.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <h2 className="card-title mt-2">{item.name}</h2>
                                            <div className="container">
                                                
                                            <h3>₹{item.price}</h3>
                                            <button  onClick={()=> HandleDelete(item)} className = "bg-info"style={{backgroundColor:"",marginLeft:"100px",width:"90px" }}>Delete</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleCloserem} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
{/* --- */}
<Dialog open={opendet} onClose={handleClosedet}>
                <DialogTitle>Details Service</DialogTitle>
                <DialogContent>
                    {employeeServicesdet &&
                        employeeServicesdet?.existingSer?.length === 0 ? (
                        <h1>It has No Services</h1>
                    ) : (
                        employeeServicesdet?.existingSer?.map((item) => (
                            <div class="container mt-5" key={item._id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={item.url} className="img-fluid" alt={item.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <h2 className="card-title mt-2">{item.name}</h2>
                                            <div className="container">
                                                
                                            <h3>₹{item.price}</h3>
                                     
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleClosedet} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>




        </div>


    );
}
export default EmpSer;