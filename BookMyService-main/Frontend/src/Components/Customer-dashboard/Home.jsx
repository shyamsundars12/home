import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { FaShoppingCart } from 'react-icons/fa';
import { Carousel } from 'react-carousel-minimal';
import axios from 'axios';
import md5 from 'md5';
import img1 from './img/service-2.jpg';
import img2 from './img/service-1.jpg';
import img3 from './img/service-3.jpg';
import img4 from './img/about-1.jpg';

const Home = () => {
    const [user, setUser] = useState([]);
    const [cartActive, setCartActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pincode, setPincode] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('id');

        if (role) {
            if (role === md5("Employee")) {
                window.location.href = '/Employee';
            } else if (role === md5("Admin")) {
                window.location.href = '/admin';
            }

            setIsLoggedIn(true);

            const fetchCustomerData = async () => {
                try {
                    const response = await axios.post('http://localhost:5000/customer/getCustomerById', { _id: userId });
                    const customer = response.data?.[0];
                    const address = customer?.address?.[0];

                    setPincode(address?.pincode || 'Not Available');
                    setCartActive(customer?.cart?.serList ? true : false);
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            };

            fetchCustomerData();
        }
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.post('http://localhost:5000/service/getService');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const carouselData = [
        {
            image: "https://try.geoop.com/wp-content/uploads/2023/03/Best-apps-for-cleaners.jpg",
            caption: "Making Your Life Easier, One Service at a Time."
        },
        {
            image: "https://homemaidbetter.com/wp-content/uploads/2019/05/shutterstock_526418566.jpg",
            caption: "Your Comfort, Our Priority."
        },
        {
            image: "https://cdn.gobankingrates.com/wp-content/uploads/2018/06/20-Professional-House-Cleaning-shutterstock_395889778.jpg?webp=1&w=675&quality=75",
            caption: "Experience the Joy of Convenience"
        }
    ];

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    };

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    };

    return (
        <>
            <div style={{ background: "#D4E6F1" }}>
                <NavBar />
                
                {/* Carousel */}
                <div className="container-fluid" style={{ padding: '2px' }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ padding: "0 20px" }}>
                            <Carousel
                                data={carouselData}
                                time={1500}
                                width="1300px"
                                height="500px"
                                captionStyle={captionStyle}
                                radius="10px"
                                slideNumber={true}
                                slideNumberStyle={slideNumberStyle}
                                captionPosition="bottom"
                                automatic={true}
                                dots={true}
                                pauseIconColor="white"
                                pauseIconSize="40px"
                                slideBackgroundColor="transparent"
                                thumbnailWidth="100px"
                                style={{
                                    textAlign: "center",
                                    maxWidth: "1200px",
                                    margin: "10px auto",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Our Services Section */}
                <div className="container text-center">
                    <h2>Our Services</h2>
                    <p>Explore our wide range of expert services tailored for you</p>
                </div>

                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row g-4">
                        {[img1, img2, img3].map((image, index) => (
                            <div className="col-lg-4 col-md-6 service-item-top" key={index}>
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100 h-100" src={image} alt={`Service ${index + 1}`} />
                                </div>
                                <div className="d-flex align-items-center justify-content-between p-4" style={{ backgroundColor: "#afc5ff" }}>
                                    <h5 className="text-truncate me-3 mb-0">Service {index + 1}</h5>
                                    <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddServices">
                                        <i className="fa fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* About Section */}
                <div className="container-xxl py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <h6>About Us</h6>
                            <h1>We Are Trusted Service Company Since 2020</h1>
                            <p>Service you can trust, results you can rely on—Service Sync is your go-to for excellence.</p>
                        </div>
                        <div className="col-lg-6">
                            <img className="img-fluid rounded-3" src={img4} alt="About Us" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-dark text-white py-5">
                    <div className="text-center">
                        <p>&copy; {new Date().getFullYear()} ServiceSync. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
