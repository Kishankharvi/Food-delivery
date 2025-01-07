import React, { useContext, useState } from "react";
import "./UserPopup.css";
import { AuthContext } from "../../context/AuthContext";
import StoredOrders from "./StoredOrders";
import { StoreContext } from "../../context/StoreContext";

const UserPopup = ({ setShowPopup }) => {
  const { isLoggedIn, isSignedIn, logout, user, userId } =
    useContext(AuthContext);
  const { storedOrders, fetchStoredOrders } = useContext(StoreContext);
  const [showPopuporder, setShowPopuporder] = useState(false);

  const handleUserPopup = () => {
    logout();
    setShowPopup(false);
  };

  const toggleOrders = async () => {
    try {
      await fetchStoredOrders(userId);
      console.log(userId);
      setShowPopuporder(true);
    } catch (error) {
      console.error("Error fetching stored orders:", error);
    }
  };

  return (
    <div className="user-popup">
      {isLoggedIn || isSignedIn ? (
        <>
          <h3>User Details</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Ordered Items:</p>
          <ul>
            {user.orders &&
              user.orders.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <button className="order-details-btn" onClick={toggleOrders}>
            Order Details
          </button>
          <button className="logout-btn" onClick={handleUserPopup}>
            Logout
          </button>
        </>
      ) : (
        <div>Please log in</div>
      )}
      {showPopuporder && (
        <StoredOrders
          storedOrders={storedOrders}
          closePopup={() => setShowPopuporder(false)}
        />
      )}
    </div>
  );
};

export default UserPopup;
