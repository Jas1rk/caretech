import React, { useState } from "react";
import "./Search.css";
import Cancel from "../../../assets/Svg/Cancel";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";


const Search = () => {
  const [search, setSearch] = useState("");
  const { homeDoctors } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const cancelSearch = () => {
    setSearch("");
    filterDoctors("");
  };

  const filterDoctors = homeDoctors.filter((dr) => {
    return dr.categoryData.categoryName
      .toLowerCase()
      .includes(search.toLowerCase());
  });


  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          className="search"
          placeholder="Search categories"
          value={search}
          onChange={(event) => handleChange(event)}
        />
        {search && (
          <div className="cancel-icon" onClick={cancelSearch}>
            <Cancel />
          </div>
        )}
      </div>
      {search.length !== 0 && (
        <div className="search-results">
          {filterDoctors.length > 0 ? (
            filterDoctors.map((dr, index) => (
              <div 
                onClick={()=> navigate(`/doctordetails?doctorid=${dr._id}`)}
                key={index}
                className="m-1 hover:bg-[#f1f9fa] p-1 hover:rounded-lg"
              >
                <div className="image-and-name">
                  <img
                    src={
                      `../src/assets/images/${dr.profileImageOfDoctor}` || (
                        <Skeleton />
                      )
                    }
                    alt="doctor image"
                    className="serch-image"
                  />
                  <div className="name-and-details">
                    <div className="text-sm font-bold">
                      {dr?.nameOfDoctor || <Skeleton />}
                    </div>
                    <div className="text-sm text-gray-400">
                      {dr?.categoryData.categoryName || <Skeleton />}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No results</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
