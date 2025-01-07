// src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { CartSvg } from "../../assets/StarSvg";
import UserPopup from "../Userdetail/UserPopup";
import userLogo from "../../assets/149071.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const { isLoggedIn, isSignedIn } = useContext(AuthContext);

  const handleLogoClick = () => {
    setShowPopup(!showPopup);
  };

  const scrollToSearch = () => {
    const searchField = document.getElementById("search");
    if (searchField) {
      const yOffset = -100; // Adjust as needed to position the field correctly
      const y =
        searchField.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const yOffset = -100; // Adjust as needed to position the field correctly
      const y =
        contactSection.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="Navbar" id="Navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          HOME
        </Link>
        <a
          href="#expole-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          MENU
        </a>
        <a
          onClick={() => {
            setMenu("contact");
            scrollToContact();
          }}
          className={menu === "contact" ? "active" : ""}
        >
          CONTACT
        </a>
      </ul>
      <div className="Navbar-right">
        <a onClick={scrollToSearch}>
          <img src={assets.search_icon} alt="search_icon" />
        </a>
        <div className="Navbar-search-icon">
          <Link to="/cart">
            <CartSvg />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {isLoggedIn || isSignedIn ? (
          <div className="user-logo">
            <img
              src={userLogo}
              alt="User Logo"
              onClick={handleLogoClick}
              className="user-logo"
            />
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}> Sign In</button>
        )}
        {showPopup && <UserPopup setShowPopup={setShowPopup} />}
      </div>
    </div>
  );
};

export default Navbar;
