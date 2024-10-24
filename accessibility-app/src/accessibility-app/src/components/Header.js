import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming we have a CSS file for styling
import logo from '../images/logo.png'; // Correct path to the logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <div className="left-links">
          <Link to="/">Home</Link>
          <Link to="/route-suggestions">Route Suggestions</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/map">View Map</Link> {/* Added the link to the map here */}
        </div>
        <Link to="/login" className="login-link">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
