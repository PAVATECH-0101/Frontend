import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming we have a CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Access</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/route-suggestions">Route Suggestions</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Header;
