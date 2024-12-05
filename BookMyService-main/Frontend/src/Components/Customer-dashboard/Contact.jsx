import React, { useEffect, useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Box, CircularProgress } from '@mui/material';
import NavBar from '../NavBar';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Contact = () => {
  const [cartActive, setCartActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState({ lat: 11.0168, lng: 76.9558 });
  const [address, setAddress] = useState("Coimbatore, Tamil Nadu, India");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch customer data and check login status
    const role = localStorage.getItem('role');
    if (role != null) {
      if (role === md5("Employee")) {
        window.location.href = '/Employee';
      } else if (role === md5("Admin")) { 
        window.location.href = '/admin';
      }
      setIsLoggedIn(true);
      const data = { _id: localStorage.getItem('id') };
      axios.post(`http://localhost:5000/customer/getCustomerById`, data)
        .then((response) => {
          if (response?.data[0]?.cart?.serList === '') {
            setCartActive(false);
          } else {
            setCartActive(true);
          }
        })
        .catch(err => console.error('Error fetching customer data:', err));
    }

    // Initialize the Leaflet map when component is mounted
    const map = L.map('map').setView([location.lat, location.lng], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker for the location
    const marker = L.marker([location.lat, location.lng])
      .addTo(map)
      .bindPopup(address)
      .openPopup();

    // Cleanup the map when the component unmounts
    return () => {
      map.remove();
    };
  }, [location, address]);

  return (
    <div style={{ 
      background: 'linear-gradient(to right, #A6C8FF, #E0F4FF)', 
      minHeight: "100vh",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <NavBar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} style={{ padding: '20px', borderRadius: '12px', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: '600', color: '#2980b9', fontSize: '1.5rem' }}>
                Our Location
              </Typography>

              {/* OpenStreetMap container */}
              <Box height="300px" width="100%" id="map" borderRadius="12px" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
                {isLoading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={6} style={{ padding: '20px', borderRadius: '12px', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: '600', color: '#2980b9', fontSize: '1.5rem' }}>
                Contact Us
              </Typography>
              <form>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  variant="outlined"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    padding: '10px 0',
                    marginTop: '20px',
                    backgroundColor: '#3498db',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Send
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>

      {cartActive && isLoggedIn && (
        <Link to={"/Customer/Cart/"} style={{ textDecoration: 'none' }}>
          <FaShoppingCart
            size={60}
            color="#fff"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              cursor: 'pointer',
              border: '3px solid #3498db',
              borderRadius: '50%',
              padding: '12px',
              backgroundColor: '#2980b9',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            }}
          />
        </Link>
      )}
    </div>
  );
}

export default Contact;
