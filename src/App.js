import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import About from "./components/About";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
