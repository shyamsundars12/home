import React, { useState } from 'react';
import { useEffect, } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2"
function ServiceCreationForm() {
    const {id} = useParams();
    const [user,setuser] =useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        time: '',
        desc: '',
        image: null, // To store the selected image file
    });
    useEffect(() => {
   
        const data = {
          serId: id
        };
    
    
        axios.post(`http://localhost:5000/service/getServiceById`, data)
          .then((response) => {
            console.log(response.data)
            setuser(response.data);
          })
          .catch((error) => {
    
            console.error('Error fetching customer data:', error);
          });
      }, []);

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

        const data = new FormData();
        data.append('_id',id);
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('time', formData.time);
        data.append('desc', formData.desc);
        data.append('image', formData.image);

        try {
            const response = await axios.post('http://localhost:5000/service/updateService', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Service created:', response.data);
            if(response)
            Swal.fire({
                title: 'Updated!',
                text: 'Services is Updated Successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            })
            window.location.href = '/';
          
        } catch (error) {
            console.error('Error creating service:', error);
           
        }
    };

    return (
        <div style={{
            width: "420px",
            margin: "0 auto",
            marginTop: "50px",
            border: "2px solid black",
            borderRadius: "10px",
            height: "600px",
            backgroundColor: "#c3bef0", // Add a background color
            display: "flex", // To center the form horizontally and vertically
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
        }}>
            <div style={{ }}>
                <h2 style={{ }}>Update  Service</h2>
                <form
      onSubmit={handleSubmit}
      style={{
        width: "300px",
        margin: "0 auto",
        padding: "20px",
    
        borderRadius: "5px",
        backgroundColor: "#c3bef0",
        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom:"30px"
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name || user.name}
          onChange={handleInputChange}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price || user.price}
          onChange={handleInputChange}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={formData.time || user.time}
          onChange={handleInputChange}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Description:</label>
        <textarea
          name="desc"
          value={formData.desc || user.desc}
          onChange={handleInputChange}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
          style={{
            width: "100%",
            padding: "5px",
            border: "2px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Update Service
        </button>
      </div>
    </form>
            </div>
            </div>
            );
}

            export default ServiceCreationForm;
