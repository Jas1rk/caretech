import React from "react";
import bannerimg from "../../../assets/Public/bannerimage.png";
import "./Banner.css";

const Banner = (props) => {
  return (
    <div
      className={props.isSmall ? "small-Banner-container" : "banner-container"}
    >
      <div className="banner-content">
        <div className="banner-title">
          <h2 className="text-3xl font-semibold">Find your perfect match</h2>
        </div>
        <div className="banner-description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas
            laboriosam eum suscipit sit non maiores laborum blanditiis a.
            Laborum repellendus nobis dolores amet sint rerum at quas eveniet
            facere.
          </p>
        </div>
        <button className="mt-20 cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl">
          Explore more
        </button>
      </div>
      <div className="banner-child-container">
        <img src={bannerimg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
