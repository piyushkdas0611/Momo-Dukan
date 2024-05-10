import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Order from "./components/Order";
import Contact from "./components/Contact";
import About from "./components/About";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="welcome" element={<Welcome/>}/>
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
