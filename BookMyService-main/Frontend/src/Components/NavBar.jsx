import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap is imported
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#1E3D58', padding: '0.8rem 2rem' }}>
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand text-white" to="/" style={{ fontWeight: 'bold', fontSize: '1.8rem', letterSpacing: '1px' }}>
          Service Sync
        </Link>

        {/* Toggle button for mobile screens */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                Home
              </Link>
            </li>

            {/* About Us Link */}
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/Customer/About/" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                About Us
              </Link>
            </li>

            {/* Service Link */}
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/Customer/AddServices/" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                Service
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/Customer/Contact" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                Contact Us
              </Link>
            </li>

            {/* Cart Link */}
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/Customer/Cart" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                <FaShoppingCart size={25} color="white" />
              </Link>
            </li>

            {/* Login Link */}
            <li className="nav-item login-register" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
