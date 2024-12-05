
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import md5 from "md5"
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
import axios from 'axios';
const EditEmployee = (props) => {
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(`http://localhost:5000/employee/getEmployeeByEmail`, email);
      return response.data.mess;
      // console.log(response.data.mess); // Assuming the response contains a property "exists" indicating whether the email exists
    } catch (error) {
      console.error('Error checking email:', error);
      return false; // Handle errors gracefully
    }
  };


  const [user, setuser] = useState({});
  const { id } = useParams();
 
  useEffect(() => {
   
    const data = {
      _id: id
    };


    axios.post(`http://localhost:5000/employee/getEmployeeById`, data)
      .then((response) => {
        console.log(response.data)
        setEmail(response.data.email) 
        setpassword(response.data.password) 
        setfname(response.data.fname) 
        setlname(response.data.lname) 
        setcontact(response.data.contact_no) 
        setAddress(response.data.address[0].society_name)
        setlandmark(response.data.address[0].landmark)
        setcity(response.data.address[0].city)
        setPincode(response.data.address[0].pincode)
        sethouse_no(response.data.address[0].house_no)

        setuser(response.data);
      })
      .catch((error) => {

        console.error('Error fetching Employee data:', error);
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
        })      }


      if (!isEmailValid || !isPasswordValid) {
        setEmail('');
        setpassword('');
        return;
      }

  
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
            _id: user._id,
            fname: fname,
            lname: lname,
            email: email,
            password: md5(password),
            contact_no: contact_no,
            address: add
          }

          const response = await axios.post('http://localhost:5000/employee/updateEmployee', data);
          Swal.fire({
            text: 'Employee Updated Successfully',
            icon: 'success',
            title: "Employee updated!!!",
            confirmButtonText: 'Close'
          }).then(
            
        
          window.location.href = '/Admin/Employee'
          )


          console.log('Data sent successfully:', response.data);
          window.location.href = '/Admin/Employee';
        } catch (error) {
          Swal.fire({
            title: 'Something Went Wrong... :/',
            icon: 'warning',
            text: "please try again later",
            confirmButtonText: 'Got It'
          })
        

        }
      }
    }
  }

  return (
    <>
      {/* <h1>{user[0]._id}</h1> */}
      <div style={containerStyle}>
        <div style={formStyle}>
          <h4 className="text-center">Employee Updatation Form</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter First name</Form.Label>
              <Form.Control
                type="text"
                //   defaultValue={user[0].fname}
                placeholder={user.fname}
                value={fname || user.fname}
                onChange={(e) => setfname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Last name</Form.Label>
              <Form.Control
                type="text"
                //   defaultValue={user[0].fname}
                placeholder={user.lname}
                value={lname || user.lname}
                onChange={(e) => setlname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email || user.email}
                value={email || user.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Password:</Form.Label>
              <Form.Control
                type="password"
          
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter contact number:</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.contact_no}
                value={contact_no || user.contact_no}
                onChange={(e) => setcontact(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Group>
                <Form.Label>house_no</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=   {user?.address?.length > 0 ? user.address[0].house_no : 'N/A'} 
                  value={house_no|| user?.address?.length > 0 && user.address[0].house_no}
                  onChange={(e) => sethouse_no(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter street Address:</Form.Label>
                <Form.Control
                  type="text"
                    placeholder={user?.address?.length > 0 ? user.address[0].society_name: "N/A"}
                  value={streetAddress || user?.address?.length > 0 && user.address[0].society_name}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter landmark</Form.Label>
                <Form.Control
                  type="landmark"
                    placeholder={user?.address?.length > 0 ? user.address[0].landmark: "N/A"}
                  value={landmark || user?.address?.length > 0 && user.address[0].landmark}
                  onChange={(e) => setlandmark(e.target.value)}

                />
              </Form.Group>
              <Form.Group as={Form.Col}>
                <Form.Label>Enter city:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user?.address?.length > 0 ? user.address[0].city: "N/A"}
                  value={city || user?.address?.length > 0 && user.address[0].city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </Form.Group>


              <Form.Group as={Form.Col}>
                <Form.Label>Enter pincode:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user?.address?.length > 0 ? user.address[0].pincode: "N/A"}
                  value={pincode || user?.address?.length > 0 && user.address[0].pincode}
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
export default EditEmployee;