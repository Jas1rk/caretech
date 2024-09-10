import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeDoctors } from "../../../Redux/User/UserThunk";
import { toast } from "sonner";
import "./DoctorsRow.css";

const DoctorsRow = () => {
  const dispatch = useDispatch();
  const { homeDoctors } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchHomeDoctors());
  }, []);


  return (
    <div className="main-row">
      {homeDoctors.map((dr, index) => (
        <>
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={`../src/assets/images/${dr.profileImageOfDoctor}`}
                  alt="Avatar"
                  className="doctor-image rounded-full w-[200px] h-[200px] mt-[50px] mx-auto mb-[10px] flex justify-center items-center object-cover object-center border-4 border-[#136a8a]"
                />

                <h2 className="doctor-name font-bold">Dr.{dr.nameOfDoctor}</h2>
              </div>
              <div className="flip-card-back">
                <div className="flib-back-content">
                  <h1>{`Dr.${dr.nameOfDoctor} ${dr.degreeOfDoctor}`}</h1>
                  <p>{dr.categoryData.categoryName}</p>
                  <p>We love that guy</p>
                </div>
                <button className="deatailes-button">Explore</button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default DoctorsRow;
