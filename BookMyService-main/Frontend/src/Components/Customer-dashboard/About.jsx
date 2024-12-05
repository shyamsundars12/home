import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import img1 from './img/service-2.jpg';
import img2 from './img/service-1.jpg';
import img3 from './img/service-3.jpg';
import img4 from './img/about-1.jpg'
import img5 from './img/about-2.jpg'
import NavBar from '../NavBar';
import { colors } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import md5 from 'md5'
const About = () => {
    const [cartActive, setCartActive] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role != null) {
            if (role === md5("Employee")) {
                window.location.href = '/Employee';
            } else if (role === md5("Admin")) {
                window.location.href = '/admin';
            }
            setIsLoggedIn(true);
            const data = {
                _id: localStorage.getItem('id')
            };
            axios.post(`http://localhost:5000/customer/getCustomerById`, data)
                .then((response) => {
                    // console.log(cartActive)

                    if (response?.data[0]?.cart?.serList == '') {
                        setCartActive(false)
                    } else {
                        setCartActive(true)
                    }
                });

        }}, []);

    return (
        <>
            <div style={{ background: "#D4E6F1" }}>
                <NavBar></NavBar>

                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "100px", }}>
                    {/* <div style={containerStyle}> */}
                    {openDialog && (
                        <div
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'white',
                                padding: '20px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                zIndex: '9999',
                            }}
                        >
                            {/* Content of your dialog */}
                            <h2>Our Services</h2>
                            <p>1. Home Cleaning:

                                Book My Services provides professional home cleaning services to help users maintain a clean and hygienic living space.
                                Services include deep cleaning, sofa cleaning, bathroom cleaning, and more.</p>
                            <p>
                                2. Beauty and Salon Services:

                                Users can book beauty and salon services at home, including haircuts, facials, waxing, and massages.
                                Certified professionals visit the user's location to provide these services.
                            </p><p>
                                3. Plumbing Services:

                                Book My Services connects users with licensed plumbers for various plumbing needs.
                                Services include fixing leaks, repairing pipes, and installing new fixtures.
                            </p><p>
                                4. Electrical Services:

                                Users can book electricians for electrical repairs and installations.
                                Services cover issues like faulty wiring, switchboard repairs, and fan installations.
                            </p><p>
                                5. Appliance Repair:

                                The platform offers appliance repair services for items like ACs, refrigerators, washing machines, and microwave ovens.
                                Certified technicians diagnose and fix appliance issues.
                            </p>


                            {/* Button to close the dialog */}
                            <button onClick={() => setOpenDialog(false)} style={{ backgroundColor: " #8bffff", width: "100%" }}>Close</button>

                        </div>
                    )}
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" style={{ justifyItems: "center" }} data-wow-delay="0.1s">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100 h-100" src={img1} alt="" />
                                </div>
                                <div className="d-flex align-items-center justify-content-between p-4" style={{ backgroundColor: "#8bffff" }}>
                                    <h5 className="text-truncate me-3 mb-0">Residential Plumbing</h5>
                                    <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddSErvices"><i className="fa fa-arrow-right"></i></Link>
                                </div>
                                <button className='btn btn-success' onClick={() => setOpenDialog(true)} style={{ border: "1px solid #000 " }}>Read More</button>
                            </div>
                            <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.3s">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100 h-100" src={img2} alt="" />
                                </div>
                                <div className="d-flex align-items-center justify-content-between p-4" style={{ backgroundColor: "#afc5ff" }}>
                                    <h5 className="text-truncate me-3 mb-0">Commercial Plumbing</h5>
                                    <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddSErvices"><i className="fa fa-arrow-right"></i></Link>

                                </div>
                                <button className='btn btn-success' onClick={() => setOpenDialog(true)} style={{ border: "1px solid #000 " }}>Read More</button>
                            </div>
                            <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.5s">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100 h-100" src={img3} alt="" />
                                </div>
                                <div className="d-flex align-items-center justify-content-between  p-4" style={{ backgroundColor: "#cca8e9" }}>
                                    <h5 className="text-truncate me-3 mb-0">Emergency Servicing</h5>
                                    <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddSErvices"><i className="fa fa-arrow-right"></i></Link>
                                </div>
                                <button className='btn btn-success' onClick={() => setOpenDialog(true)} style={{ border: "1px solid #000 " }}>Read More</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* about  */}
                <div className="container-xxl py-5 d-flex justify-content-center align-items-center" style={{ marginLeft: "" }}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="text-secondary text-uppercase">About Us</h6>
                                <h1 className="mb-4">We Are Trusted Plumbing Company Since 1990</h1>
                                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Residential & commercial plumbing</p>
                                <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Quality services at affordable prices</p>

                                <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Immediate 24/ 7 emergency services</p>
                                <div className="bg-primary d-flex align-items-center p-4 mt-5">
                                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: " 60px", height: "60px" }}>
                                        <i className="fa fa-phone-alt fa-2x text-primary"></i>
                                    </div>
                                    <div className="ms-3">
                                        <p className="fs-5 fw-medium mb-2 text-white">Emergency 24/7</p>
                                        <h3 className="m-0 text-secondary">+012 345 6789</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 pt-4" style={{ minHeight: "500px" }}>
                                <div className="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                                    <img className="position-absolute img-fluid w-100 h-100" src={img4} style={{ padding: " 0 0 50px 100px ", objectFit: "cover", borderRadius: "100px" }} alt="" />
                                    <img className="position-absolute start-0 bottom-0 img-fluid bg-white pt-2 pe-2 w-50 h-50" style={{ objectFit: "cover", borderRadius: "100px" }} src={img5} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
            {cartActive && isLoggedIn
                ? <Link to={"/Customer/Cart/"}>
                    <FaShoppingCart size={50} color="#89cff0" item='10' style={{
                        position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer', border: '1px solid #f8f4ff',
                        borderRadius: '10px',
                        padding: '8px',
                        backgroundColor: '#faebd7',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', marginRight: "50px"
                    }} cartActive={false} />
                </Link>
                : <></>
            }
        </>
    );
}
export default About