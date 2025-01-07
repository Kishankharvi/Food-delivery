import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { imageUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../componets/LoginPopup/LoginPopup";
import { AuthContext } from "../../context/AuthContext";

const Cart = () => {
  const { userId, isLoggedIn, isSignedIn } = useContext(AuthContext);
  const [showLoginc, setShowLoginc] = useState(false);
  const {
    storeOrder,
    cartItems,
    rest_info,
    addItem,
    removeItem,
    isonxamp,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const cartData = [];

  const handleProceed = () => {
    if (isLoggedIn || isSignedIn) {
      rest_info.forEach((item) => {
        const itemId = item.info.id;
        const price = item.info.costForTwo
          ? parseInt(item.info.costForTwo.replace(/\D/g, ""), 10)
          : 0;
        const quantity = cartItems[itemId];
        const total = price * quantity;
        const image = item.info.cloudinaryImageId;
        const title = item.info.cuisines;

        if (quantity > 0) {
          cartData.push({
            title,
            price,
            image,
            quantity,
            total,
          });
        }
      });

      console.log(cartData);

      navigate("/order", { state: { userId, cartData } });
    } else {
      setShowLoginc(true);
    }
  };

  const isCartEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className="cart">
      {showLoginc && <LoginPopup setShowLogin={setShowLoginc} />}
      {!isCartEmpty && (
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {rest_info.map((item) => {
            const itemId = item.info.id;
            const price = item.info.costForTwo
              ? parseInt(item.info.costForTwo.replace(/\D/g, ""), 10)
              : 0;
            if (cartItems[itemId] > 0) {
              return (
                <div key={itemId}>
                  <div className="cart-items-row">
                    <img src={imageUrl + item.info.cloudinaryImageId} alt="" />
                    <p>{item.info.cuisines}</p>
                    <p>₹{price}</p>
                    <p>{cartItems[itemId]}</p>
                    <p>₹{price * cartItems[itemId]}</p>
                    <p onClick={() => removeItem(itemId)} className="cross">
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      {isCartEmpty ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some items to the cart to proceed to checkout.</p>
        </div>
      ) : (
        <div className="cart-bottom">
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
            <button onClick={handleProceed}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
