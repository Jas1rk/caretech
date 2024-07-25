import React from "react";
import {
  Header,
  BannerImage,
  DoctorsRow,
  CategoriesRow,
  Footer,
} from "../Components";

const Home = () => {
  return (
    <div className="homeParent">
      <Header />
      <BannerImage />
      <DoctorsRow />
      <CategoriesRow />
      <BannerImage isSmall />
      <Footer />
    </div>
  );
};

export default Home;
