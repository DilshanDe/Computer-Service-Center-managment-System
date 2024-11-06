import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by checking localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
        setIsLoggedIn(true);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/storepage'); 
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your email and password and try again.',
        confirmButtonText: 'OK'
      });
      console.error('There was an error logging in!', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setIsLoggedIn(false);
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/'); // Redirect to the home page
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url('https://i.postimg.cc/Z5ynQhrr/half-of-macbook-pro-2013-picjumbo-com.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          maxWidth: '400px',
          width: '100%',
          background: '#2E4F4F80',
          color: '#fff',
          border: 'none',
          borderRadius: '15px',
        }}
      >
        <h2 className="text-center mb-4"><b>{isLoggedIn ? 'Welcome' : 'Login'}</b></h2>
        {!isLoggedIn ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"><b>Email</b></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><b>Password</b></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100"><b>Login</b></button>
            <div className="text-center mt-3">
              <p>Don't have an account?</p>
              <Link to="/sign" className="btn btn-secondary">Create Account</Link>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-center">You are already logged in.</p>
            <button onClick={handleLogout} className="btn btn-danger w-100 mt-3"><b>Logout</b></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
