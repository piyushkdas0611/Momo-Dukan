import React, {useEffect} from 'react';
import {Link}from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = "hidden";

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
    <div className="home">
      <div className="container">
        <h1>Welcome Back</h1>
        <div className="btn">
            <Link to="/order"><button>Order</button></Link>
          <p>
            Or Take out <span>Couple Discount Available!</span>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Welcome