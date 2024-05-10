import React, { useState, useEffect } from "react";
import "./Order.css";
import steamMomo from "./images/steam_momo.jpg";
import friedMomo from "./images/fried_momo.jpg";
import tandooriMomo from "./images/tandoori_momo.jpg";
import chilliMomo from "./images/chili_momo.webp";
import afghaniMomo from "./images/afgani-momomo.webp";
import momoSoup from "./images/Momo-soup.webp";
import spicyMomo from "./images/spicy_creamy_momo.jpg";
import momoRamen from "./images/momo_ramen.jpg";

const Order = () => {


  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = "hidden";

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const menuItem = [
    { id: 1, name: "Steam Momo", type: "veg", price: 100, image: steamMomo },
    {
      id: 2,
      name: "Steam Momo",
      type: "non-veg",
      price: 120,
      image: steamMomo,
    },
    { id: 3, name: "Fried Momo", type: "veg", price: 120, image: friedMomo },
    {
      id: 4,
      name: "Fried Momo",
      type: "non-veg",
      price: 120,
      image: friedMomo,
    },
    {
      id: 5,
      name: "Tandoori Momo",
      type: "veg",
      price: 120,
      image: tandooriMomo,
    },
    {
      id: 6,
      name: "Tandoori Momo",
      type: "non-veg",
      price: 120,
      image: tandooriMomo,
    },
    { id: 7, name: "Chilli Momo", type: "veg", price: 120, image: chilliMomo },
    {
      id: 8,
      name: "Chilli Momo",
      type: "non-veg",
      price: 120,
      image: chilliMomo,
    },
    {
      id: 9,
      name: "Afghani Momo",
      type: "veg",
      price: 120,
      image: afghaniMomo,
    },
    {
      id: 10,
      name: "Afghani Momo",
      type: "non-veg",
      price: 120,
      image: afghaniMomo,
    },
    { id: 11, name: "Momo Soup", type: "veg", price: 120, image: momoSoup },
    { id: 12, name: "Momo Soup", type: "non-veg", price: 120, image: momoSoup },
    {
      id: 13,
      name: "Spicy Creamy Momo",
      type: "veg",
      price: 120,
      image: spicyMomo,
    },
    {
      id: 14,
      name: "Spicy Creamy Momo",
      type: "non-veg",
      price: 120,
      image: spicyMomo,
    },
    { id: 15, name: "Momo Ramen", type: "veg", price: 120, image: momoRamen },
    {
      id: 16,
      name: "Momo Ramen",
      type: "non-veg",
      price: 120,
      image: momoRamen,
    },
  ];
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (menuItem) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === menuItem.id && item.type === menuItem.type
    );

    if (existingItemIndex !== -1) {
      // Item already exists in cart, update the quantity
      setCartItems((prevItems) =>
        prevItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Item doesn't exist in cart, add it with quantity 1
      setCartItems((prevItems) => [...prevItems, { ...menuItem, quantity: 1 }]);
    }
  };

  // Function to remove items from the cart
  const removeFromCart = (itemId, itemType) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === itemId && item.type === itemType))
    );
  };

  return (
    <div className="order">
      <div className="menu">
        <h1>Our Categouries</h1>
        <div className="categouries">
          <div className="item">
            <img src={steamMomo} alt="" />
            <p>Steam Momo</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="item">
            <img src={friedMomo} alt="" />
            <p>Fried Momo</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="item">
            <img src={tandooriMomo} alt="" />
            <p>Tandoori Momo</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="item">
            <img src={chilliMomo} alt="" />
            <p>Chilli Momo</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
        </div>
        <div className="categouries">
          <div className="item">
            <img src={afghaniMomo} alt="" />
            <p>Afghani Momo</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="item">
            <img src={momoSoup} alt="" />
            <p>Momo Soup</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="item">
            <img src={spicyMomo} alt="" />
            <p>Spicey Creamy Momo</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="item">
            <img src={momoRamen} alt="" />
            <p>Momo Ramen</p>
            <div className="btnn">
              <button
                className={`btn-veg ${menuItem.type === "veg" ? "selected" : ""}`}
                onClick={() => addToCart({ ...menuItem, type: "veg" })}
              >
                Veg
              </button>
              <button
                className={`btn-non-veg ${
                  menuItem.type === "non-veg" ? "selected" : ""
                }`}
                onClick={() => addToCart({ ...menuItem, type: "non-veg" })}
              >
                Non-Veg
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Display the cart */}
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.type}`}>
                <span>{item.name}</span>
                <span>{item.type}</span>
                <span>Quantity: {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id, item.type)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Order;
