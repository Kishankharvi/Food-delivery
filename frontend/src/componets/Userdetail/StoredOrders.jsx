import React from "react";
import "./StoredOrdersPopup.css";
import { imageUrl } from "./../../utils/constants";

const StoredOrdersPopup = ({ storedOrders, closePopup }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Stored Orders</h2>
        <div className="cart-items">
          <table>
            <thead>
              <tr className="cart-items-title">
                <th>Item</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Order_Time</th>
              </tr>
            </thead>
            <tbody className="cart-items-list">
              {storedOrders.length > 0 ? (
                storedOrders.map((order, index) => (
                  <tr key={index} className="order-item">
                    <td>{order.title}</td>
                    <td>
                      <img
                        src={imageUrl + order.image}
                        alt={order.title}
                        className="order-image"
                      />
                    </td>
                    <td>₹{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.total}</td>
                    <td>{order.order_time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No stored orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button className="close-btn" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default StoredOrdersPopup;
