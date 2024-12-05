import React from 'react';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
const DetailEmployee =()=>{
    const {id} = useParams();   
    const [user,setuser] =useState({});
    const data={
        _id : id
    }; 
    useEffect(() => {
     
    
        // Make a GET request to fetch customer data
        axios.post(`http://localhost:5000/employee/getEmployeeById`,data)
          .then((response) => {
       
            console.log(response.data)
                setuser(response.data);
    
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error fetching Employee data:', error);
          });
      }, []);
     

      
    return(
        <>
     


 
     <div style={styles.container}>
      <Card style={styles.card}>
  <Card.Body>
    <Card.Title style={styles.cardTitle}>User Details</Card.Title>
    <Card.Text style={styles.cardText}>
      <strong>First Name:</strong> {user.fname} <br />
      <strong>Last Name:</strong> {user.lname} <br />
      <strong>Email:</strong> {user.email} <br />
    
      <strong>Contact:</strong> {user.contact_no} <br />
      <strong>House Number:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].house_no : 'N/A'} <br />
      <strong>Street Name:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].society_name : 'N/A'} <br />
      <strong>Landmark:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].landmark : 'N/A'} <br />
      <strong>City:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].city : 'N/A'} <br />
      <strong>Pincode:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].pincode : 'N/A'} <br />
      <strong>Lat:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].lat : 'N/A'} <br />
      <strong>Lng:</strong>{' '}
      {user?.address?.length > 0 ? user.address[0].lng : 'N/A'} <br />
    
      <strong>Email Status:</strong> {user.emailstatus} <br />
      <strong>Rating:</strong> {user.rating} <br />
    </Card.Text>
  </Card.Body>
</Card>
</div>

 



        </>
    );
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#c9fdd7', // Replace with your desired background color
  },
  card: {
    backgroundColor: '#d59bf6', // Replace with your desired card background color
    maxWidth: '400px',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '24px',
  },
  cardText: {
    fontSize: '18px',
  },
};
export default DetailEmployee;