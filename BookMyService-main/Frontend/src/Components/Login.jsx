import React, { useState } from 'react';
import './CssF/kogin.css'; // Import the CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';
import md5 from "md5"
import Swal from 'sweetalert2'

const Login = () => {
  const id = localStorage.getItem('id')
  if(id !== null ){
    window.location.href = '/';
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Check email and password against the regular expressions
    const isEmailValid = emailPattern.test(email);
    
    const isPasswordValid = passwordPattern.test(password);
    // const isPasswordValid =true;
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
      })
    }


    if (!isEmailValid || !isPasswordValid) {
      // setEmail('');
      // setPassword('');
      return;
    }
    try {
      const data = {

        email: email,
        password: password,
        role : role
      }

      const response = await axios.post('http://localhost:5000/login/checkExists', data)
      if (response.data.message === false) {
        console.log(response.message)
        Swal.fire({
          title: 'Account Does Not Exists!',
          text: 'Create Account ?',
          html: `<a href='/signup'>Create Account ?</a>`,
          icon: 'warning',
          confirmButtonText: 'Re-Enter'
        })
      } else {
        const isValid = await axios.post('http://localhost:5000/login/validate', data)

        console.log(JSON.stringify(isValid))
        if (isValid.data.message === true) {
          localStorage.setItem('id',isValid.data.id)
          localStorage.setItem("role",md5(role))
          let timerInterval
          Swal.fire({
            title: 'Login Successful!',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            
            if(role === 'employee' || role ==="Employee"){
             
              window.location.href='/Employee';
            }
            if(role === 'customer'){
              window.location.href = '/';
            }else if(role === 'admin' || role === 'Admin'){
              window.location.href = '/admin';
            }else if(role === 'employee' || role === 'Employee'){
              window.location.href = '/employee';
            }
           
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
          // window.location.href = '/';
         } else {
        Swal.fire({
          title: 'Failed!',
          text: 'Wrong Email Or Password',
          icon: 'warning',
          confirmButtonText: 'Retry'
        })
        setEmail('');
        setPassword('');
      }
    }
    } catch (error) {
    Swal.fire({
      title: 'Something Went Wrong!',
      text: 'Please Try Again Later',
      icon: 'question',
      confirmButtonText: 'Got It!'
    })
    console.error('Error sending data:', error);

  }
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Role:', role);

};



return (

  <div className="login-container " >
    <h2 className="login-heading">Login</h2>
    <form>
      <div>
        <label className="label" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          className="input-field"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label className="label" htmlFor="password">
          Password:
        </label>
        <input
          className="input-field"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <label className="label">Select Role:</label>
        <select
          className="input-field"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="Customer">Customer</option>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button className="login-button" type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
    <div className="links">
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
     
    </div>
  </div>
);
};

export default Login;
