import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from "sweetalert2"
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: '#f5f5f5', // Light background color
};

const formStyle = {
  width: '600px', // Adjust the width as needed
  padding: '20px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

export default function AddCustomer() {
  // Define state variables to store form input values
  // const[flag,setflag] =useState(false);
  // let flag = 0;
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [contact_no, setcontact] = useState('');
  const [house_no, sethouse_no] = useState('');
  const [streetAddress, setAddress] = useState('');
  const [landmark, setlandmark] = useState('');
  const [city, setcity] = useState('');
  const [pincode, setPincode] = useState('');
  // const [cust, setcust] = useState([{}])
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
 
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

  // Function to handle form submission
  const handleSubmit = async (event) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    event.preventDefault();  
    const data = {
      email: email
      } 
    const emailExists = await checkEmailExists(data);
        if (emailExists) {
          Swal.fire({
            title: 'Error',
            text: 'Email address is already exist!',
            icon: 'warning',
            confirmButtonText: 'Okay'
        })
          setEmail('');
          setpassword('');
        }
        else {
          const isEmailValid = emailPattern.test(email);
          const isPasswordValid = passwordPattern.test(password);

         
          if (!isEmailValid) {
            Swal.fire({
              title: 'Invalid email address',
              text: 'Please enter a valid email!',
              icon: 'warning',
              confirmButtonText: 'Okay'
          })
          }

          if (!isPasswordValid) {
            
            Swal.fire({
              title: 'Invalid password',
              text: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.',
              icon: 'warning',
              confirmButtonText: 'Okay'
          })

          }


          if (!isEmailValid || !isPasswordValid) {
            setEmail('');
            setpassword('');
            return;
          }
          if(isEmailValid && isPasswordValid){
            try {
            
              const add = {
      
                house_no: house_no,
                society_name: streetAddress,
                landmark: landmark,
                city: city,
                pincode: pincode,
      
      
              };
      
              const data = {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                contact_no: contact_no,
                address: add
              }
              console.log("haassss!!!!")
      
              const response = axios.post('http://localhost:5000/customer/createCustomer', data);
              Swal.fire({
                title: 'Account Created Successfully',
                text: 'BookMyService Got Your Back',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then(  
            window.location.href = '/Admin/Customer')
      
             
            } catch (error) {
                Swal.fire({
                  title: 'Ah.. Something Went Wrong...!',
                  text: 'Please Try Again Later',
                  icon: 'warning',
                  confirmButtonText: 'Got It'
              })
            }
         
          }
        }





    console.log('Form data submitted:');
    console.log('Full Name:', fname);
    console.log('Email:', email);
    console.log('password:', password);
    console.log('City:', city);
    console.log('Pincode:', pincode);
   
  }

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h4 className="text-center">Customer Registration Form</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter your First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First name"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter your Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter your email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter your Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Enter your contact number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact_no"
              value={contact_no}
              onChange={(e) => setcontact(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Group>
              <Form.Label>house_no</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter house_no."
                value={house_no}
                onChange={(e) => sethouse_no(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter your street Address:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street address"
                value={streetAddress}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter landmark</Form.Label>
              <Form.Control
                type="landmark"
                placeholder="Enter landmark"
                value={landmark}
                onChange={(e) => setlandmark(e.target.value)}

              />
            </Form.Group>
            <Form.Group as={Form.Col}>
              <Form.Label>Enter city:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </Form.Group>


            <Form.Group as={Form.Col}>
              <Form.Label>Enter your pincode:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit" block>
            Click here to submit form
          </Button>
        </Form>
      </div>
    </div>
  );
}
