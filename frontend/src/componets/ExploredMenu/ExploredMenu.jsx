import React from "react";
import "./ExploredMenu.css";
import { menu_list } from "../../assets/assets";

const ExploredMenu = ({ category, setCategory }) => {
  return (
    <div className="expole-menu" id="expole-menu">
      <h1>Explore our menu</h1>
      <p className="expole-menu-text">
        QuickBite delivers your favorite meals fast and fresh from local
        restaurants. Order now and enjoy delicious food at home!
      </p>
      <div className="expole-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="expole-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploredMenu;
