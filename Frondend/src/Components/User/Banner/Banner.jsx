import React from "react";
import bannerimg from "../../../assets/Public/bannerimage.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        <div className="banner-title">
          <h1>Find your perfect match</h1>
        </div>
        <div className="banner-description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas
            laboriosam eum suscipit sit non maiores laborum blanditiis a.
            Laborum repellendus nobis dolores amet sint rerum at quas eveniet
            facere.
          </p>
        </div>
        <button>Explore more</button>
      </div>
      <div className="banner-child-container">
        <img src={bannerimg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
