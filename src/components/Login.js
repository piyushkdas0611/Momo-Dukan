import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const LoginPage = () => {
  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = "hidden";

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        } else {
          alert("Invalid Credentials");
        }
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
                Didn't have an account? <Link to="/register">create here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
