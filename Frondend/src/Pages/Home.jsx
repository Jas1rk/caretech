import React from "react";
import { Header, BannerImage, DoctorsRow, CategoriesRow } from "../Components";

const Home = () => {
  return (
    <div className="homeParent">
      <Header />
      <BannerImage />
      <DoctorsRow />
      <CategoriesRow />
    </div>
  );
};

export default Home;
