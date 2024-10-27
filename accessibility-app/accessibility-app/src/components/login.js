import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Login() {
  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="login-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '40px', borderRadius: '10px' }}>
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
            <img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="google" className="social-icon" />
          </Link>
          <Link to="/activation">
            <img src={`${process.env.PUBLIC_URL}/images/facebook.jpg`} alt="facebook" className="social-icon" />
          </Link>
          <Link to="/activation">
            <img src={`${process.env.PUBLIC_URL}/images/apple.png`} alt="apple" className="social-icon" />
          </Link>
        </div>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
