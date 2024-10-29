import React, { useState } from 'react';
import './signup.css'; // Import the CSS file for custom styling
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // POST request to the sign-up endpoint in the backend
      const response = await axios.post('http://localhost:5000/signup', { username, email, password });
      if (response.status === 201) {
        alert(response.data.message);
        navigate('/login'); // Redirect to login page on successful sign-up
      }
    } catch (error) {
      alert(error.response && error.response.data.message ? error.response.data.message : 'Sign up failed');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="login-form">
        <h1 className="login-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Username" 
            required 
            className="input-field" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            placeholder="Confirm Password" 
            required 
            className="input-field" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            Sign Up <AiOutlineArrowRight />
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
          Already have an account? <Link to="/login" className="signup-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
