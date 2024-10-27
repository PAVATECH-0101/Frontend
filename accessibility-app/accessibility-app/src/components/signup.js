import React from 'react';
import './signup.css'; // Import the CSS file for custom styling
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

function SignUp() {
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
        <form>
          <input type="text" id="username" name="username" placeholder="Username" required className="input-field" />
          <input type="email" id="email" name="email" placeholder="Email Address" required className="input-field" />
          <input type="password" id="password" name="password" placeholder="Password" required className="input-field" />
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required className="input-field" />
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
