import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {

  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = "hidden";

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the form data, e.g., send it to the server for order processing
    // Replace the following lines with your actual logic
    console.log('Form Data:', formData);
    alert('Feedback submitted successfully!');
  };

  return (
    <div className='home'>
    <div className="contact-container">
      <h2>Give Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Contact;
