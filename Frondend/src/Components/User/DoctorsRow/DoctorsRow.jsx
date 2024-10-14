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
             
                <div className="" key={index}>
                  <img
                    src={`../src/assets/images/${dr.profileImageOfDoctor}`}
                    alt="Avatar"
                    className=""
                  />
                  <h2 className="doctor-name font-bold">
                    Dr.{dr.nameOfDoctor}
                  </h2>

                  <div className="details">
                    <h1>{`Dr.${dr.nameOfDoctor} ${dr.degreeOfDoctor}`}</h1>
                    <p>{dr.categoryData.categoryName}</p>
                    <p>We love that guy</p>
                    <button
                      className="details-button"
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
