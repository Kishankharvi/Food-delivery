import React from "react";
import "./FoodIteam.css";
import { imageUrl } from "../../utils/constants";
import { StarIcon } from "../../assets/StarSvg";

const FoodIteams = ({ restaurant, openModal }) => {
  const {
    id,
    name,
    cuisines,
    areaName,
    costForTwo,
    avgRatingString,
    cloudinaryImageId,
  } = restaurant.info;

  return (
    <div onClick={() => openModal(restaurant)} className="card">
      <div className="cardimg1 restcard-logo">
        <div className="cardimg">
          <div className="cardimg2">
            <img src={imageUrl + cloudinaryImageId} alt={name} />
          </div>
        </div>
      </div>
      <div className="restcard-info">
        <div className="restcard-name">{cuisines}</div>
        <div className="restcard-star-time">
          <div className="restcard-starSVG">
            <StarIcon />
          </div>
          <div className="restcard-rating gnOsqr">
            <span className="gnOsqr">{avgRatingString} ⋯⋯ </span>
            {costForTwo ?? "₹200 for two"}
          </div>
        </div>
        <div className="restcard-location">
          <div className="restcard-cuisines dnXOKm">{name}</div>
          <div className="restcard-area dnXOKm">{areaName}</div>
        </div>
      </div>
    </div>
  );
};

export default FoodIteams;
