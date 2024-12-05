import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ServiceCreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    time: '',
    desc: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      Swal.fire({
        title: 'Error',
        text: 'Please upload an image.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('time', formData.time);
    data.append('desc', formData.desc);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/service/createService', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Service Created Successfully',
        text: 'New service added!',
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => navigate('/Admin/Services'));
    } catch (error) {
      console.error('Error creating service:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create service.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginTop: '90px',
        }}
      >
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
          Create a New Service
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Time"
            name="time"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Description"
            name="desc"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={formData.desc}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="image" style={{ marginBottom: '10px' }}>
              Upload Image
            </InputLabel>
            <Input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              style={{ marginTop: '10px' }}
              required
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px', width: '100%' }}
          >
            Create Service
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ServiceCreationForm;
