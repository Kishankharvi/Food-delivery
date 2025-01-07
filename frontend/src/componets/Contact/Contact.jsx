import React, { useContext, useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import contimg from "../../assets/Contact.png"; // Adjust the path as needed
import { AuthContext } from "../../context/AuthContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);

  const { user, isLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "mail_transfer_id", // Replace with your EmailJS service ID
        "template_7xgz2gk", // Replace with your EmailJS template ID
        e.target,
        "K-y3iYGoy2CyGTCg1" // Replace with your EmailJS user ID
      )
      .then(() => {
        setAlertMessage("Message sent successfully");
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      })
      .catch(() => {
        setAlertMessage("Failed to send message");
      });

    // Clear the alert after 5 seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  return (
    <div className="contact-container">
      <div className="contact-image">
        <img src={contimg} alt="Contact" />
      </div>
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={isLoggedIn ? user.name : formData.name}
              onChange={handleChange}
              required
              disabled={isLoggedIn}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={isLoggedIn ? user.email : formData.email}
              onChange={handleChange}
              required
              disabled={isLoggedIn}
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default Contact;
