import React, { useState, useContext, useEffect } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodIteams from "../FoodIteams/FoodIteams";
import RestaurantModal from "../RestaurantModal/RestaurantModal";

const FoodDisplay = () => {
  const { rest_info, addItem } = useContext(StoreContext);
  const [filteredRestaurants, setFilteredRestaurants] = useState(rest_info);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [itemAddedMessage, setItemAddedMessage] = useState("");

  useEffect(() => {
    setFilteredRestaurants(rest_info);
  }, [rest_info]);

  const parsePrice = (priceString) =>
    parseInt(priceString.replace(/[^\d]/g, ""));

  const filterByRating = () => {
    let filteredList = rest_info
      .filter((restaurant) => restaurant.info.avgRating >= 4.0)
      .sort((a, b) => b.info.avgRating - a.info.avgRating);
    setFilteredRestaurants(filteredList);
  };

  const filterByPriceRange = () => {
    let filteredList = rest_info.filter((restaurant) => {
      const costForTwo = parsePrice(restaurant.info.costForTwo);
      return costForTwo >= 300 && costForTwo <= 600;
    });
    setFilteredRestaurants(filteredList);
  };

  const filterByMaxPrice = () => {
    let filteredList = rest_info.filter((restaurant) => {
      const costForTwo = parsePrice(restaurant.info.costForTwo);
      return costForTwo < 300;
    });
    setFilteredRestaurants(filteredList);
  };

  const resetFilters = () => {
    setFilteredRestaurants(rest_info);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filteredList = rest_info.filter((item) =>
      item.info.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRestaurants(filteredList);
  };

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  const handleAddItem = (itemId) => {
    const result = addItem(itemId);
    if (result) {
      setItemAddedMessage(
        `Item ${result.itemName} added to cart. Count: ${result.count}`
      );
      setTimeout(() => setItemAddedMessage(""), 4000);
    }
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="filter" id="filter">
        <button className="top-rating" onClick={filterByRating}>
          Ratings 4.0+
        </button>
        <button className="between" onClick={filterByPriceRange}>
          Rs. 300-Rs. 600
        </button>
        <button className="lessthan-300" onClick={filterByMaxPrice}>
          Less than Rs. 300
        </button>
        <button onClick={resetFilters}>Reset Filters</button>
        <input
          id="search"
          className="input-search"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="food-display-list">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((item, index) => (
            <FoodIteams key={index} restaurant={item} openModal={openModal} />
          ))
        ) : (
          <p className="search-result">No items found</p>
        )}
      </div>
      <RestaurantModal
        restaurant={selectedRestaurant}
        onClose={closeModal}
        addItem={handleAddItem}
      />
      {itemAddedMessage && (
        <div className="item-added-message">{itemAddedMessage}</div>
      )}
    </div>
  );
};

export default FoodDisplay;
