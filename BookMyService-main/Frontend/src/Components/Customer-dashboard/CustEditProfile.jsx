import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import md5 from "md5"
const CustEditProfile = () => {

    const data = {
        _id: localStorage.getItem('id')
    }
    const [user, setuser] = useState({})
    useEffect(() => {
        try {
            axios.post("http://localhost:5000/Customer/getCustomerById", data)
                .then((response) => {
                    console.log(response.data)
                    const userData = response.data[0] || {}; // Use the first item if it's an array
                    setuser(userData);
                    console.log(userData)
                    setFormData(userData)
                    const address = response.data[0].address[0];
                    setAddress(address);
                })
                .catch((error) => {
                    console.error('Error fetching customer data:', error);
                });
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    }, []);
    const [formData, setFormData] = useState({
        fname: user.fname || '',
        lname: user?.lname || '',
        email: user?.email || '',
        password: user.password || '',
        contact_no: user.contact_no || '',

    });
    const [address, setAddress] = useState({
        house_no: "",
        society_name: "",
        landmark: "",
        city: "",
        pincode: "",
    });
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        console.log("here " + name, value)
        setAddress({ ...address, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const add = {
            house_no: address.house_no,
            society_name: address.society_name,
            landmark: address.landmark,
            city: address.city,
            pincode: address.pincode,
        }
        const data1 = {
            _id: localStorage.getItem('id'),
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
            password: md5(formData.password),
            contact_no: formData.contact_no,
            address: add
        }

        try {

            axios.post("http://localhost:5000/customer/updateCustomer", data1)
                .then((response) => {
                    console.log(response.data);
                    Swal.fire({
                        title: 'Updated Successfully',
                        icon: 'success',
                        text: "",
                        confirmButtonText: 'Okay'
                    }).then(() => {

                        window.location.href = "/Customer/Profile/" + localStorage.getItem('id')

                    })



                })
        }
        catch (error) {
            console.log(error)

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };




    return (
        <>
            <div className="container mt-5  justify-content-center align-items-center  ">
                <div className="row">
                    <div className="col-md-16 offset-md-3" style={{ width: "500px" }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Edit Profile</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <TextField
                                            label="First Name"
                                            name="fname"
                                            value={formData?.fname}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <TextField
                                            label="Last Name"
                                            name="lname"
                                            value={formData?.lname}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={formData?.email}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <TextField
                                            label="Password"
                                            name="password"
                                            type="password"
                                          
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <TextField
                                            label="Contact Number"
                                            name="contact_no"
                                            value={formData?.contact_no}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>
                                    <TextField
                                        label="House Number"
                                        name="house_no"
                                        // value={user[0]?.address?.length > 0 ? user[0].address[0].house_no : "N/A"}
                                        value={address.house_no}
                                        onChange={handleAddChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Society"
                                        name="society_name"
                                        value={address.society_name}
                                        onChange={handleAddChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Landmark"
                                        name="landmark"
                                        value={address.landmark}
                                        onChange={handleAddChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="City"
                                        name="city"
                                        value={address.city}
                                        onChange={handleAddChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Pincode"
                                        name="pincode"
                                        value={address.pincode}
                                        onChange={handleAddChange}
                                        fullWidth
                                        margin="normal"
                                    />

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                        <Link to="/">
                                        <button  className="btn btn-info" style={{marginLeft:"30px"}}>
                                            back to Home
                                        </button> </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CustEditProfile;