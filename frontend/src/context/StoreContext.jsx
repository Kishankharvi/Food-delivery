import { createContext, useState } from "react";
import { rest_info } from "./../assets/resCardsItems";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [storedOrders, setStoredOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  const addItem = (itemId) => {
    let itemInfo = rest_info.find((product) => product.info.id === itemId);

    const itemName = itemInfo.info.cuisines;
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) + 1;
      return { ...prev, [itemId]: newCount };
    });

    return { itemName, count: (cartItems[itemId] || 0) + 1 };
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
      if (updatedCart[itemId] <= 0) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    console.log(cartItems); // For debugging
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = rest_info.find(
          (product) => product.info.id === itemId
        );
        if (itemInfo && itemInfo.info.costForTwo) {
          const price = parseInt(
            itemInfo.info.costForTwo.replace(/\D/g, ""),
            10
          );
          total += price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const storeOrder = async (userId, cartData) => {
    try {
      const response = await axios.post("http://localhost/store_order.php", {
        userId,
        cartData: cartData,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error("Error storing order:", error);
      setisonxamp(false);
    }
  };

  const fetchStoredOrders = async (userId) => {
    try {
      const response = await axios.post("http://localhost/getorder.php", {
        userId,
      });
      setStoredOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const contextValue = {
    rest_info,
    cartItems,
    userId,
    setCartItems,
    fetchStoredOrders,
    storedOrders,
    storeOrder,
    addItem,
    clearCart,
    removeItem,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
