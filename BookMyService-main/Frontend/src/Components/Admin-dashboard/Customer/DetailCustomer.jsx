import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailCustomer = () => {
  const { id } = useParams();
  const [user, setUser] = useState([{}]);
  const data = {
    _id: id,
  };

  useEffect(() => {
    axios
      .post(`http://localhost:5000/customer/getCustomerById`, data)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <Card.Title style={styles.cardTitle}>User Details</Card.Title>
          <Card.Text style={styles.cardText}>
            <strong>First Name:</strong> {user[0].fname} <br />
            <strong>Last Name:</strong> {user[0].lname} <br />
            <strong>Email:</strong> {user[0].email} <br />
        
            <strong>Contact:</strong> {user[0].contact_no} <br />
            <strong>House Number:</strong>{' '}
            {user[0]?.address?.length > 0 ? user[0].address[0].house_no : 'N/A'} <br />
            <strong>Street Name:</strong>{' '}
            {user[0]?.address?.length > 0 ? user[0].address[0].society_name : 'N/A'} <br />
            <strong>Landmark:</strong>{' '}
            {user[0]?.address?.length > 0 ? user[0].address[0].landmark : 'N/A'} <br />
            <strong>City:</strong>{' '}
            {user[0]?.address?.length > 0 ? user[0].address[0].city : 'N/A'} <br />
            <strong>Pincode:</strong>{' '}
            {user[0]?.address?.length > 0 ? user[0].address[0].pincode : 'N/A'} <br />
            {/* <strong>Latitude:</strong> {user[0].latitude} <br />
            <strong>Longitude:</strong> {user[0].longitude} <br /> */}

          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

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

export default DetailCustomer;
