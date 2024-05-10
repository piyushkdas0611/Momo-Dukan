import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import momoIcon from './images/momo.png'

const Navigation = () => {
  return (
    <nav>
      <div className="icon">
        <img src={momoIcon} alt="icon"/>
        <h2>MOMO DUKAN</h2>
      </div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
