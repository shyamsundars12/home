import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card';



import DialogContentText from '@mui/material/DialogContentText';
import TextField from "@mui/material/TextField";

const rowsPerPageOptions = [4, 5, 7];

const AddOn = () => {

    const [open, setOpen] = useState(false);
    const [openrem, setOpenrem] = useState(false);

    const [openadd, setOpenadd] = useState(false);

    const [SelectEmp, setEmp] = useState({})
    const [selectAddOn, setSelectAddOn] = useState({})
    const [SelectAdd, setSelectAdd] = useState({});
    //   const services = [ /* Your list of services goes here */ ];
    const [services, setService] = useState([]);

    const [addOnRemove, setAddOnRemove] = useState([]);
    const [addOnDetails, setAddOnDetails] = useState([]);
    const [employeeServicesdet, setEmployeeServicesdet] = useState([]);

    const [item, setitem] = useState([])
    const [opendet, setdet] = useState(false);




    const handleClose = () => {
        setEmp('')
        setOpen(false);
    };

    const [serData, serDataChange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);



    const HandleOpenAdd = (item) => {
        setSelectAdd(item);

        setOpenadd(true);



    }
    const HandleCloseAdd = () => {


        setSelectAdd({});
        setOpenadd(false);
    }
    const handleSubmit = () => {

    }
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        desc: '',
        image: null, // To store the selected image file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData({ ...formData, image: imageFile });
    };



    const HandleOpenRem = (item) => {

        setSelectAddOn(item)
        setOpenrem(true);
        try {
            console.log(item)
            const data = {
                serId: item._id
            };

            axios.post("http://localhost:5000/addOn/getAddOnBySerId", data)
                .then((response) => {
                    console.log(response.data.addOns);
                    if (response.data.message != false) {
                        setAddOnRemove(response.data.addOns);
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCloserem = () => {
        setSelectAddOn('')
        setOpenrem(false);
    };
    const HandleDelete = (item) => {
        handleCloserem()
        const datarem = {
            addOnId: item._id,
            serId: selectAddOn._id
        }
        console.log(selectAddOn)
        try {

            axios.post("http://localhost:5000/addOn/removeAddOn", datarem)
                .then((response) => {


                    Swal.fire({
                        title: 'Deleted Successfully',
                        icon: 'success',
                        text: "",
                        confirmButtonText: 'Okay'
                    }).then(() => {

                        window.location.href = "/admin/addOn"
                    })



                })
        }
        catch (error) {
            console.log(error)

        }

    }
    const HandleOpendet = (item) => {
        setitem(item)
        setdet(true)
        try {
            // console.log(item)
            const data = {
                serId: item._id
            };

            axios.post("http://localhost:5000/addOn/getAddOnBySerId", data)
                .then((response) => {
                    console.log(response.data.addOns);
                    if (response.data.message != false) {
                        setAddOnDetails(response.data.addOns);
                    }
                })
        }
        catch (error) {
            console.log(error)
        }



    }
    const HandleClosedet = () => {
        setitem({});
        setdet(false)
    }
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
    const HandleSubmitAdd = () => {

        HandleCloseAdd();
        const data = new FormData();
        data.append('serId', SelectAdd._id)
        data.append('name', formData.name);
        data.append('price', formData.price);

        data.append('desc', formData.desc);
        data.append('image', formData.image);

        console.log(data)
        try {

            axios.post("http://localhost:5000/addOn/addAddOns", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            })
                .then((response) => {


                    Swal.fire({
                        title: 'Added Successfully',
                        icon: 'success',
                        text: "",
                        confirmButtonText: 'Okay'
                    }).then(() => {

                        window.location.href = "/admin/addOn"
                    })



                })
        }
        catch (error) {
            console.log(error)

        }


    }









    useEffect(() => {

        axios.post('http://localhost:5000/service/getService')
            .then((response) => {

                serDataChange(response.data);
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
                            <h2>Addon Listing</h2>
                        </div>
                        <div className="card-body" >

                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Time</td>

                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody style={{ marginRight: "0px", textAlign: "center" }}>

                                    {
                                        serData && serData

                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <tr key={item._id}>
                                                    <td >{page * rowsPerPage + index + 1}</td>
                                                    <td style={{ textAlign: "left" }}>{item.name}</td>
                                                    <td style={{ textAlign: "left" }}>{item.price}</td>
                                                    <td style={{ textAlign: "left" }}>{item.time}</td>



                                                    <td ><button onClick={() => HandleOpenAdd(item)} className="btn btn-success" style={{ marginLeft: "5px" }}>Add Accessories</button>
                                                        <button onClick={() => HandleOpenRem(item)} className="btn btn-danger" style={{ marginLeft: "5px" }}>Remove Accessories</button>
                                                        <button onClick={() => HandleOpendet(item)} className="btn btn-primary" style={{ marginLeft: "5px" }}>Details</button>


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
                                    count={serData
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
            <Dialog open={openrem} onClose={handleCloserem}>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogContent>
                    {addOnRemove &&
                        addOnRemove?.length === 0 ? (
                        <h1>No add-On Items Found</h1>
                    ) : (
                        addOnRemove?.map((item) => (
                            <div class="container mt-2" style={{width:"290px"}} key={item._id}>
                                
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="col-md-6">
                                                            <img src={item.url} style={{width:'50%'}}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6 className="card-title mt-4 mb-4" >Name : {item.name}</h6>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6 className="card-title mt-4 mb-4"> Price : ₹{item.price}</h6>
                                                        </div>
                                                        <div className="container">

                                                            <button onClick={() => HandleDelete(item)} className="bg-info" style={{ backgroundColor: "", marginTop: "20px", marginBottom: "20px", marginLeft: "100px", width: "100px" }}>Delete</button>
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

                    <Button onClick={handleCloserem} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* --- */}


            <Dialog open={opendet} onClose={HandleClosedet}>
                <DialogTitle>Details addon items</DialogTitle>
                <DialogContent>
                    {addOnDetails &&
                        addOnDetails?.length === 0 ? (
                        <h1>No add-On Items Found</h1>
                    ) : (
                        addOnDetails?.map((item) => (
                            <div class="container mt-2" style={{width:"290px"}} key={item._id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="container">
                                                <div className="row" style={{width:"200px"}}>
                                                    <div className="col-md-12">
                                                    <div className="col-md-6">
                                                            <img src={item.url} style={{width:'90%'}}/>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h6 className="card-title mt-3 mb-3" >Name : {item.name}</h6>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h6 className="card-title mt-4 mb-4"> Price : ₹{item.price}</h6>
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

                    <Button onClick={HandleClosedet} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ........ */}


            <Dialog open={openadd} onClose={HandleCloseAdd}>
                <DialogTitle>Add items</DialogTitle>
                <DialogContent>
                    
                    <DialogContentText>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Item Name"
                                name="name"
                                // value={user[0]?.address?.length > 0 ? user[0].address[0].house_no : "N/A"}

                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Item Price"
                                name="price"

                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="desc"

                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            
                            <label>Image:</label>
                            <br></br>
                            <input
                                type="file"
                                name="image"
                                style={{ border: "2px solid black" }}
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                            />


                        </form>

                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={HandleSubmitAdd} color="primary">
                        Submit
                    </Button>
                    <Button onClick={HandleCloseAdd} color="primary">
                        Close
                    </Button>

                </DialogActions>
            </Dialog>






        </div>


    );
}
export default AddOn;