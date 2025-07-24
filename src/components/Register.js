import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // Make sure to import the updated CSS

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      if (res.status === 201) {
        alert('User registered successfully!');
        setFormData({ username: '', email: '', password: '' }); // Clear form
        navigate('/login'); // Redirect to login after success
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container" style={{ maxWidth: '400px', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            name="username"
            type="text"
            required
            onChange={handleChange}
            value={formData.username}
            autoComplete="username"
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={formData.email}
            autoComplete="email"
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            value={formData.password}
            autoComplete="new-password"
          />
          <button type="submit" style={{ marginTop: '1rem', width: '100%' }}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
