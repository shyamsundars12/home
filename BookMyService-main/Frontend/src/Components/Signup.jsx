import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CssF/signup.css';
import NavBar from './NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Swal from 'sweetalert2'
// import {  useHistory } from 'react-router-dom'; // Import Link for navigation

const Signup = () => {
//    let flag=0;
    const [email, setEmail] = useState('');
    const [log,setlog] =useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [contact_no, setContact] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [society, setSociety] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    // const [image, setImage] = useState(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    // const [passwordMatch, setPasswordMatch] = useState(true);   

    const [selectedAddressOption, setSelectedAddressOption] = useState('currentLocation');
    const checkEmailExists = async (email) => {
        try {
          const response = await axios.post(`http://localhost:5000/customer/getCustomerByEmail`, email);
          return response.data.mess;
          // console.log(response.data.mess); // Assuming the response contains a property "exists" indicating whether the email exists
        } catch (error) {
          console.error('Error checking email:', error);
          return false; // Handle errors gracefully
        }
      };

    const handleSignUp = async(e) => {
        e.preventDefault();   

        // Add signup logic here
        if (password === confirmPassword) {
        console.log('Sign Up clicked');
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        console.log(fname);
        console.log(lname);
        console.log(houseNo);
        console.log(society);
        console.log(streetAddress);
        console.log(landmark);
        console.log(city);
        console.log(state);
        console.log(pincode);
        console.log(latitude);
        console.log(longitude);
        console.log(e);


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    const data = {
        email: email
        } 
      const emailExists = await checkEmailExists(data);
          
      if (emailExists) {
        Swal.fire({
            title: ' email already Exist address!',
            text: ' Please enter another email.',
            icon: 'warning',
            confirmButtonText: 'Re-Enter'
          })
            setEmail('');
            setPassword('');
            setConfirmPassword('')
          }
          else {
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);
    

    // Display validation messages
    if (!isEmailValid) {
        Swal.fire({
            title: 'Invalid email address!',
            text: ' Please enter a valid email.',
            icon: 'warning',
            confirmButtonText: 'Re-Enter'
          })
    }

    if (!isPasswordValid) {
        Swal.fire({
            title: 'Invalid password!',
            text: ' Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.',
            icon: 'warning',
            confirmButtonText: 'Re-Enter'
          }) }


    if (!isEmailValid || !isPasswordValid) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    if(isEmailValid && isPasswordValid){
        try {
            // const formData = new URLSearchParams();
            // formData.append("fname" , fname);
            // formData.append("lname" , lname);
            // formData.append("email" , email);
            // formData.append("password" , password);
            // formData.append("contact_no" , contact_no);
            const add ={
          
                house_no : houseNo,
                society_name : society,
                landmark:landmark,  
                city:city,
                pincode:pincode,
                lat:latitude,
                lng:longitude
                

            };

            const data = {
                fname : fname,
                lname : lname,
                email : email,
                password : md5(password),    
                contact_no : contact_no,
                address: add
            }

            const response = await axios.post('http://localhost:5000/customer/createCustomer',data);
           
          
            if(response){
                Swal.fire({
                    text:'Signup Successfully now you can login in.... ',
                    icon: 'success',
                    title: "signup Successfully!!!",
                    confirmButtonText: 'Close'
                  })
                setlog(true);
            }
            
            console.log('Data sent successfully:', response.data);
          } catch (error) {
            Swal.fire({
                title: 'Something Went Wrong!',
                text: 'Please Try Again Later',
                icon: 'question',
                confirmButtonText: 'Got It!'
              })
              console.error('Error sending data:', error);
          
           
  
          }
        }
      
      
        
    }
}
else{
    alert('Password does not match')
    setPassword('');
    setConfirmPassword('');
    
}
 


    };
    const loginhandle=()=>{
       
        window.location.href = '/login';
        
    }
    useEffect(() => {
        if (selectedAddressOption === 'currentLocation') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error(error.message);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }
    }, [selectedAddressOption]);

    const handleAddressOptionChange = (e) => {
        setSelectedAddressOption(e.target.value);
    };

    return (
        <>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ border: '2pxsolid rgba(15, 29, 3, 0.93)', borderRadius: '30px', width:"600px",marginLeft:"170px"}} >
                        <div className="card-body" style={{ border: '2pxsolid rgba(15, 29, 3, 0.93)', borderRadius: '30px', background: 'rgba(0, 255, 19, 0.29)',width:"600px" }}>
                            <h2 className="card-title text-center" style={{ textDecoration: 'underline' }}>Sign Up</h2>
                            <form onSubmit={handleSignUp}>
                                <div className="mb-3">
                                    <label htmlFor="Fname" className="form-label">First Name<span className="required">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Fname"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Lname" className="form-label">Last Name<span className="required">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Lname"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email<span className="required">*</span></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password<span className="required">*</span></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password<span className="required">*</span></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                     {/* {!passwordMatch && <p className="error-message">Password do not match.</p>} */}
                                     {/* {passwordMatch && <p className="error-message">Password do not match.</p>} */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Contact" className="form-label">Contact<span className="required">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Contact"
                                        value={contact_no}
                                        onChange={(e) => setContact(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Upload Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}    
                                    />
                                </div> */}


                                
                                    <div className="mb-3">
                                            <label htmlFor="houseNo" className="form-label">House No.<span className="required">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="houseNo"
                                                value={houseNo}
                                                onChange={(e) => setHouseNo(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="society" className="form-label">Society<span className="required">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="society"
                                                value={society}
                                                onChange={(e) => setSociety(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                    <label className="form-label">Address Option</label>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="addressOption"
                                            value="currentLocation"
                                            
                                            checked={selectedAddressOption === 'currentLocation'}
                                            onChange={handleAddressOptionChange}
                                        />
                                        <label className="form-check-label">Use Current Location</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="addressOption"
                                            value="manual"
                                            checked={selectedAddressOption === 'manual'}
                                            onChange={handleAddressOptionChange}
                                        />
                                        <label className="form-check-label">Enter Manual Address</label>
                                    </div>
                                </div>

                                {selectedAddressOption === 'manual' && (
                                    <div>
                                        
                                        <div className="mb-3">
                                            <label htmlFor="streetAddress" className="form-label">Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="streetAddress"
                                                value={streetAddress}
                                                onChange={(e) => setStreetAddress(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="landmark" className="form-label">Landmark</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="landmark"
                                                value={landmark}
                                                onChange={(e) => setLandmark(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="city"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="state" className="form-label">State</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="state"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="pincode" className="form-label">Pincode</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pincode"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                required
                                            />
                                        </div>

                                    </div>
                                )}


                                {!log&&<button type="submit" className="btn btn-primary w-100" >Sign Up</button>}
                            </form>

                            {log  &&<div> <button type="submit" className='btn btn-danger w-100' onClick={loginhandle}>Login</button></div>}
                            <div className="text-center mt-3">  
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Signup;
