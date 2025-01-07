// Placeorder.js
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import "./Placeorder.css";
import { StoreContext } from "./../../context/StoreContext";
import { useNavigate, useLocation } from "react-router-dom";

Modal.setAppElement("#root"); // This is for accessibility, you can change '#root' to your app's root element

const Placeorder = () => {
  const location = useLocation();
  const { userId, cartData } = location.state || {};
  const { getTotalCartAmount, storeOrder, clearCart } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("loading");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    return Object.values(formValues).every((value) => value.trim() !== "");
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setErrorMessage("");
      setIsModalOpen(true);
      setTimeout(() => {
        storeOrder(userId, cartData);
        setOrderStatus("placed");
        clearCart();
      }, 3000); // Simulate a loading time of 3 seconds
    } else {
      setErrorMessage(
        "Please fill out all the fields before proceeding to payment."
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <form action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="Email"
            placeholder="Email Address"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={formValues.street}
            onChange={handleInputChange}
          />
          <div className="multi-fields">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formValues.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              value={formValues.pincode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </p>
              </div>
            </div>
            <button type="button" onClick={handleProceedToPayment}>
              PROCEED TO PAYMENT
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Order Status"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {orderStatus === "loading" ? (
          <div className="modal-content">
            <div className="loading-spinner"></div>
            <p>Your order is loading...</p>
          </div>
        ) : (
          <div className="modal-content">
            <p>Your order is placed, enjoy your meal!</p>
            <button onClick={handleCloseModal}>Go to Home</button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Placeorder;
