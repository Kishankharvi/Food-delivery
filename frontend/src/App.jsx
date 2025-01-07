import React, { useState } from "react";
import Navbar from "./componets/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart.jsx";
import Placeorder from "./pages/Placeorder/Placeorder.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./componets/Footer/Footer.jsx";
import LoginPopup from "./componets/LoginPopup/LoginPopup.jsx";
import Checkout from "./pages/Placeorder/Checkout.jsx";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
