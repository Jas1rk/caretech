import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllCatgory } from "../../../Redux/User/UserThunk";
import { ShimmerEffect } from "../..";
import "./CategoriesRow.css";

const CategoriesRow = () => {
  const categoryData = useSelector((state) => state.user.homeCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllCatgory());
  }, [dispatch]);

  return (
    <div className="ml-3 ">
      <h2 className="ml-3">Categories</h2>
      {!categoryData || categoryData.length === 0 ? (
        <ShimmerEffect />
      ) : (
        <>
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {categoryData.map((cat, index) => (
              <div
                className="w-40 h-48  bg-gradient-to-r from-teal-700 to-blue-900 p-5 m-3 rounded-3xl shadow-2xl"
                key={index}
              >
                <div className="categoryText-container">
                  <h2 className="cat-title">{cat.categoryName}</h2>
                  <p className="cat-discription">{cat.categoryDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesRow;
