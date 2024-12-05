
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import md5 from "md5"
import Swal from "sweetalert2"
import axios from 'axios';
const EditCustomer = (props) => {
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


  const [user, setuser] = useState([{}]);
  const { id } = useParams();
 
  useEffect(() => {
   
    const data = {
      _id: id
    };


    axios.post(`http://localhost:5000/customer/getCustomerById`, data)
      .then((response) => {
        console.log(response.data)
        setuser(response.data);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;



    const data = {
      email: email
    }
    const emailExists = await checkEmailExists(data);
    if (emailExists) {
      Swal.fire({
        title: 'Invalid Email Address',
        text: 'Enter different email!',
        icon: 'warning',
        confirmButtonText: 'Okay'
    })
      setEmail('');
      setpassword('');
    }
    else {
      const isEmailValid = emailPattern.test(email);
      const isPasswordValid = passwordPattern.test(password);

      // Display validation messages
      if (!isEmailValid) {
        Swal.fire({
          title: 'Invalid Email Address!',
          text: 'Please Enter A Valid Email Address!',
          icon: 'warning',
          confirmButtonText: 'Okay'
      })
      }

      if (!isPasswordValid) {
        Swal.fire({
          title: 'Invalid password!',
          text: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit',
          icon: 'warning',
          confirmButtonText: 'Okay'
      })
      }


      if (!isEmailValid || !isPasswordValid) {
        setEmail('');
        setpassword('');
        return;
      }

      console.log('Form data submitted:');
      console.log('Full Name:', fname);
      console.log('Email:', email);
      console.log('password:', password);
      console.log('City:', city);
      console.log('Pincode:', pincode);
      if (isEmailValid && isPasswordValid) {
        try {
          // const formData = new URLSearchParams();
          // formData.append("fname" , fname);
          // formData.append("lname" , lname);
          // formData.append("email" , email);
          // formData.append("password" , password);
          // formData.append("contact_no" , contact_no);
          const add = {

            house_no: house_no,
            society_name: streetAddress,
            landmark: landmark,
            city: city,
            pincode: pincode,


          };

          const data = {
            _id: user[0]._id,
            fname: fname,
            lname: lname,
            email: email,
            password: md5(password),
            contact_no: contact_no,
            address: add
          }

          const response = await axios.post('http://localhost:5000/customer/updateCustomer', data);

          Swal.fire({
            title: 'Updated',
            text: 'Updated Successfully!',
            icon: 'success',
            confirmButtonText: 'Okay'
        }).then(
          
          
          window.location.href = '/Admin/Customer'
        )

        } catch (error) {
          Swal.fire({
            title: 'Ah.. Something Went Wrong...!',
            text: 'Please Try Again Later',
            icon: 'warning',
            confirmButtonText: 'Got It'
        })
          console.error('Error sending data:', error);

        }
      }
    }
  }


  return (
    <>
      {/* <h1>{user[0]._id}</h1> */}
      <div style={containerStyle}>
        <div style={formStyle}>
          <h4 className="text-center">Customer Registration Form</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter your First name</Form.Label>
              <Form.Control
                type="text"
                //   defaultValue={user[0].fname}
                placeholder={user[0].fname}
                value={fname || user[0]?.fname}
                onChange={(e) => setfname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter your Last name</Form.Label>
              <Form.Control
                type="text"
                //   defaultValue={user[0].fname}
                placeholder={user[0].lname}
                value={lname || user[0]?.lname}
                onChange={(e) => setlname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter your email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder={user[0]?.email }
                value={email || user[0].email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter your Password:</Form.Label>
              <Form.Control
                type="password"
              
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter your contact number:</Form.Label>
              <Form.Control
                type="text"
                placeholder={user[0].contact_no}
                value={contact_no || user[0]?.contact_no}
                onChange={(e) => setcontact(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Group>
                <Form.Label>house_no</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user[0]?.address?.length > 0 ? user[0].address[0].house_no : 'N/A'}
                  value={house_no || user[0]?.address?.length > 0 && user[0].address[0].house_no }
                  onChange={(e) => sethouse_no(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter your street Address:</Form.Label>
                <Form.Control
                  type="text"
                    placeholder={user[0]?.address?.length > 0 ? user[0].address[0].society_name : 'N/A'}
                  value={streetAddress ||  user[0]?.address?.length > 0 && user[0].address[0].society_name}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter landmark</Form.Label>
                <Form.Control
                  type="landmark"
                  placeholder={user[0]?.address?.length > 0 ? user[0].address[0].landmark : 'N/A'}
                  value={landmark ||  user[0]?.address?.length > 0 && user[0].address[0].landmark}
                  onChange={(e) => setlandmark(e.target.value)}

                />
              </Form.Group>
              <Form.Group as={Form.Col}>
                <Form.Label>Enter city:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user[0]?.address?.length > 0 ? user[0].address[0].city : 'N/A'}
                  value={city || user[0]?.address?.length > 0 && user[0].address[0].city  }
                  onChange={(e) => setcity(e.target.value)}
                />
              </Form.Group>


              <Form.Group as={Form.Col}>
                <Form.Label>Enter your pincode:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user[0]?.address?.length > 0 ? user[0].address[0].pincode : 'N/A'}
                  value={pincode ||  user[0]?.address?.length > 0 &&  user[0].address[0].pincode }
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


    </>
  );
}
export default EditCustomer;