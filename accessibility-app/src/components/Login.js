import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated to point to the correct backend URL
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.status === 200) {
        alert(response.data.message); // Show success message
        navigate('/dashboard'); // Redirect to dashboard on successful login
      }
    } catch (error) {
      // Enhanced error handling
      const errorMessage = error.response && error.response.data.message 
        ? error.response.data.message 
        : 'Unable to connect to the server. Please try again later.';
      alert(errorMessage);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email Address" 
            required 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            required 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="Google" className="social-icon" />
          </Link>
          <Link to="/activation">
            <img src={`${process.env.PUBLIC_URL}/images/facebook.jpg`} alt="Facebook" className="social-icon" />
          </Link>
          <Link to="/activation">
            <img src={`${process.env.PUBLIC_URL}/images/apple.png`} alt="Apple" className="social-icon" />
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
