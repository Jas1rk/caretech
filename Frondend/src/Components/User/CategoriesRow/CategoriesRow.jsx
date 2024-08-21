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
    <div className="category-row">
      <h2>Categories</h2>
      {!categoryData || categoryData.length === 0  ? (
       <ShimmerEffect/>
      ) : (
        <>
          <div className="main-cat-row">
            {categoryData.map((cat, index) => (
              <div className="category-row-container" key={index}>
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
