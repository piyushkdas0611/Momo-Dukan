import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import './Login.css';

const LoginPage = () => {

  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = "hidden";

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const backendURL = 'http://localhost:5000';
  const handleLogin = (e) => {
    e.preventDefault();
    // Send login request to the backend
    fetch(`${backendURL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Login successful!');
          // Perform any actions you want upon successful login
          setLoggedIn(true);
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });

    // Here, you can perform the login logic, e.g., call an API, check credentials, etc.
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form after login attempt
    setEmail('');
    setPassword('');
  };

  return (
    <div className='home'>
      <div className='container'>
      { loggedIn?
        <Welcome/> : (
      <div className='login-div'>
        <h2 className='login-header'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='form-div'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='form-div'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='form-div'>
            <button type="submit">Login</button>
          </div>
        </form>
    </div>
        )}
        </div>
    </div>
  );
};
export default LoginPage;
