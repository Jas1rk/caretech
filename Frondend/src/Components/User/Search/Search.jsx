import React, { useState, useEffect } from "react";
import Cancel from "../../../assets/Svg/Cancel";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { homeDoctors } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const cancelSearch = () => {
    setSearch("");
    setLoading(false);
  };

  const filterDoctors = homeDoctors.filter((dr) => {
    return dr.categoryData.categoryName
      .toLowerCase()
      .includes(search.toLowerCase());
  });
 

  useEffect(() => {
    if (search.length > 0) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

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
          {loading ? (
            Array(3)
              .fill()
              .map((index) => (
                <div key={index} className="m-1 p-1 flex gap-1">
                  <Skeleton
                    circle={true}
                    height={50}
                    width={50}
                    className="serch-image"
                  />
                  <div>
                    <Skeleton width={300} height={15} />
                    <Skeleton width={300} height={15} />
                  </div>
                </div>
              ))
          ) : filterDoctors.length > 0 ? (
            filterDoctors.map((dr, index) => (
              <div
                onClick={() => navigate(`/doctordetails?doctorid=${dr._id}`)}
                key={index}
                className="m-1 hover:bg-[#f1f9fa] p-1 hover:rounded-lg"
              >
                <div className="image-and-name">
                  <img
                    src={`../src/assets/images/${dr.profileImageOfDoctor}`}
                    alt="doctor image"
                    className="serch-image"
                  />
                  <div className="name-and-details">
                    <div className="text-sm font-bold">
                      {`Dr.${dr?.nameOfDoctor}`}
                    </div>
                    <div className="text-sm text-gray-400">
                      {dr?.categoryData.categoryName}
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
