import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure this path is correct
import logo from '../images/logo.png'; // Ensure this path is correct

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Toggle menu state
    console.log('Menu Open State:', !isMenuOpen); // Log new state
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="nav-toggle" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <div className="left-links">
          <Link to="/">Home</Link>
          <Link to="/route-suggestions">Route Suggestions</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/map">View Map</Link>
        </div>
        <Link to="/login" className="login-link">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
