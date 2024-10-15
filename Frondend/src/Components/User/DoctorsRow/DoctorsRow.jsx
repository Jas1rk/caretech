import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeDoctors } from "../../../Redux/User/UserThunk";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DoctorsRow.css";

const DoctorsRow = () => {
  const dispatch = useDispatch();
  const { homeDoctors } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDr = async () => {
      setLoading(true);
      await dispatch(fetchHomeDoctors());
      setLoading(false);
    };
    fetchDr();
  }, [dispatch]);

  return (
    <div className="main-row">
      {loading || homeDoctors.length === 0 ? (
        Array(4)
          .fill()
          .map((index) => (
            <div className="flip-card" key={index}>
              <div className="flip-card-inner fixed">
                <div className="flip-card-front">
                  <Skeleton
                    circle={true}
                    height={200}
                    width={200}
                    className="doctor-image mt-[50px] mx-auto mb-[10px]"
                  />
                  <Skeleton width={150} height={30} className="mx-auto" />
                </div>
              </div>
            </div>
          ))
      ) : (
        <>
          {homeDoctors.map((dr, index) => (
            <>
              <div
                className="relative w-72 h-72 m-4 rounded-lg overflow-hidden shrink-0 group"
                key={index}
              >
                <img
                  src={`../src/assets/images/${dr.profileImageOfDoctor}`}
                  alt="Avatar"
                  className="w-full h-full rounded-lg object-cover"
                />
                <h2 className="doctor-name font-bold">Dr.{dr.nameOfDoctor}</h2>

  
                <div  className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black to-transparent p-4 text-white transition-opacity  duration-300">
                  <h1 className="text-lg font-semibold">{`Dr.${dr.nameOfDoctor} ${dr.degreeOfDoctor}`}</h1>
                  <p className="text-sm">{dr.categoryData.categoryName}</p>
                  <button
                    className="mt-2  flex justify-center items-center cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                    onClick={() =>
                      navigate(`/doctordetails?doctorid=${dr._id}`)
                    }
                  >
                    Explore
                  </button>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default DoctorsRow;
