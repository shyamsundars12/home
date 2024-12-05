import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import React from 'react';

// import NavBar from '../NavBar';
const CustProfile = () => {
  const [user, setuser] = useState([{}]);
  const { id } = useParams();

  const data = {
    _id: id
  };
  useEffect(() => {

    axios.post(`http://localhost:5000/customer/getCustomerById`, data)
      .then((response) => {

        console.log(response.data)
        setuser(response.data);


      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
  }, []);

  const firstLetter = user[0]?.email?.charAt(0)?.toUpperCase();
  return (
    <>

      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <div className="card">
              <h4 className="card-title" style={{ textAlign: "center" }}>Profile</h4  >
              <br></br>
              <div className="d-flex justify-content-center align-items-center">
                <Avatar name={firstLetter} size={100} round={true} />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="card-body" style={{ width: "900px" }}>
                  <p className="card-text ">
                    <strong >First Name:</strong> {user[0]?.fname}<br />
                    <strong>Last Name:</strong> {user[0]?.lname}<br />
                    <strong>Email:</strong> {user[0]?.email}<br />
                   
                    <strong>Contact:</strong> {user[0]?.contact_no}<br />
                    <strong>House Number:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].house_no : "N/A"}<br />
                    <strong>Street Name:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].society_name : "N/A"}<br />
                    <strong>Landmark:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].landmark : "N/A"}<br />
                    <strong>City:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].city : "N/A"}<br />
                    <strong>Pincode:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].pincode : "N/A"}<br />

                  </p>
                  <br></br>
                  <div className="container justify-content-center align-items-center">
                  <Link to={"/Customer/CustEditProfile/"+localStorage.getItem('id')} className="btn btn-primary">Edit Profile</Link>
                  <Link to={"/"} className="btn btn-dark" style={{marginLeft:"40px"}}>Back To Home</Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default CustProfile