'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import './page.css';

const LoginPage: React.FC = () => {
  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = 'hidden';

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          router.push('/');
        } else {
          alert('Invalid Credentials');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className="home">
      <div className="container">
        <div className="login-div">
          <h2 className="login-header">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-div">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-div">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-div">
              <button type="submit">Login</button>
            </div>
            <div className="ifregister">
              <p>
                Didn&apos;t have an account? <Link href="/register">create here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;