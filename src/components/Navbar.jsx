import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Custom CSS for styling

// Import the image
import LogoImage from './Screenshot 2024-12-03 at 3.58.41 PM.png'; // Make sure to adjust the path based on your project structure

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">
                {/* Use the image inside the navbar brand */}
                <Link className="navbar-brand logo nav-link text-light" to="/">
                    <img src={LogoImage} alt="Blog Tyrant Logo" className="navbar-logo w-50" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="">WHO?</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">UPDATES</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">TOOLS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">BEST OF</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">THE BLOG</Link>
                        </li>
                    </ul>
                </div>
                <Link className="start-button btn btn-outline-warning ms-3 text-warning " to="">★ STARTING A NEW BLOG?</Link>
            </div>
        </nav>
    );
};

export default Navbar;
