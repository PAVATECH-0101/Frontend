

import React from 'react';
import './Login.css'; // Import the CSS file for custom styling
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai'; // Ensure react-icons is installed

function Login() {
  return (
    <div className="login-container" style={{ backgroundImage: 'url(./images/assets/backgroundabout.png)' }}>
      <div className="login-form">
        <h1 className="login-title">Log in</h1>
        <form>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email Address" 
            required 
            className="input-field"
          />
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            required 
            className="input-field"
          />
          <button 
            className="submit-btn"
            type="submit"
          >
            Log In <AiOutlineArrowRight />
          </button>
        </form>

        <div className="social-login">
          <Link to="/activation">
            <img src="./images/google.png" alt="google" className="social-icon" />
          </Link>
          <Link to="/activation">
            <img src="./images/facebook.jpg" alt="facebook" className="social-icon" />
          </Link>
          <Link to="/activation">
            <img src="./images/apple.png" alt="apple" className="social-icon" />
          </Link>
        </div>

        <p className="signup-text">
          Don’t have an account? <a href="/signup" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
