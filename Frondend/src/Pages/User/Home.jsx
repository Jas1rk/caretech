import React from "react";
import {
  Header,
  BannerImage,
  DoctorsRow,
  CategoriesRow,
  Footer,
} from "../../Components";


const Home = () => {
 
  return (
    <>
      <Header />
      <BannerImage />
      <DoctorsRow />
      <CategoriesRow />
      <BannerImage isSmall />
      <Footer />
    </>
    
  );
};

export default Home;
