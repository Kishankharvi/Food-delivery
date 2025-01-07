import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Experience the best in food delivery with QuickBite! Fast, fresh, and
          reliable service from your favorite local restaurants, delivered right
          to your doorstep. Enjoy delicious meals without the hassle. Order now
          and satisfy your cravings instantly!
        </p>
        <button>
          <a href="#expole-menu">View Menu</a>
        </button>
      </div>
    </div>
  );
};

export default Header;
