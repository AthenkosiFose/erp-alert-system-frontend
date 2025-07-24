import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import backgroundImage from './images/login-bg.jpg';
import logo from './images/logo.jpg'; // Adjust filename if needed

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      if (res.status === 200 && res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        setError('Login failed: Invalid response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',  // Needed for footer positioning
      }}
    >
      <form className="login-form smaller" onSubmit={handleLogin}>
        <h2 className="login-title">ERP Mining System</h2>

        {error && <div className="login-error">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" className="login-button">Sign In</button>

        <div className="forgot-password">
          <button
            type="button"
            className="forgot-password-button"
            onClick={() => alert('Password reset not available yet.')}
          >
            Forgot password?
          </button>
        </div>
      </form>

      {/* Footer with logo and copyright */}
      <div className="login-footer">
        <img src={logo} alt="Njimi Logo" className="footer-logo" />
        <span className="footer-text">© 2025 Njimi SE. All rights reserved</span>
      </div>

      {/* Create User Button Bottom Right */}
      <button
        className="create-user-button"
        onClick={() => navigate('/register')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#3a84ff',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: '0 4px 10px rgba(58, 132, 255, 0.4)',
          zIndex: 1100,
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2a6edc')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3a84ff')}
      >
        Create User
      </button>
    </div>
  );
}

export default Login;
