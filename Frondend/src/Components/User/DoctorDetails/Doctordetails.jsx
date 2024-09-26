import React, { useEffect } from "react";
import useFetchDoctor from "../../../Hooks/UseFetchDoctor";
import { useLocation } from "react-router-dom";
import dummy from "../../../assets/Public/dummy.jpg";
import { Footer, Header } from "../..";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faPlus,
  faMessage,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Doctordetails = () => {
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const doctorid = queryparams.get("doctorid");
  const  {doctor}  = useFetchDoctor(doctorid);
  console.log("ddkkdkd", doctor);

  

  return (
    <>
      <Header />
      <div className="p-10">
        <div className="mt-24 flex drop-shadow-2xl shadow-2xl p-5 gap-5 rounded-lg w-[54%]">
          <img src={dummy} alt="hhhhhhhhhh" className="w-72 h-80 rounded-lg" />
          <div className="flex flex-col">
            <div className="shadow-md p-4 rounded-lg w-full">
              <div className="flex gap-1">
                <h1 className="text-lg font-bold">Dr.Jasir</h1>
                <span className="text-lg font-bold">{doctor?.degreeOfDoctor}</span>
              </div>
              <div className="flex gap-1">
                <h1 className="font-bold">Specialization: </h1>
                <span>Orthopedic surgieon</span>
              </div>
              <h1>Followers: 35k</h1>
              <h1>10 Years Experience</h1>
              <h1>Nation: India</h1>
              <h1>Time:14:00 To 18:00</h1>
              <div className="flex flex-col">
                <h1 className="font-bold">
                  Rating:
                  <div className="flex gap-1">
                    <p>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400"
                      />
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400"
                      />
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400"
                      />
                    </p>
                  </div>
                </h1>
              </div>
            </div>
            <button
              className="flex justify-center items-center mt-5  cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-1 rounded-md text-white w-full transform transition duration-500 ease-in-out hover:scale-110 "
              onClick={() => toast.success(doctor._id)}
            >
              Book a slot
            </button>
            <button className="flex justify-center items-center mt-5 border-2 border-[#7c7c7c] cursor-pointer bg-[#e7e7e7]  p-1 rounded-md text-black w-full transform transition duration-500 ease-in-out hover:scale-110">
              <FontAwesomeIcon icon={faMessage} className="m-1" />
              Message
            </button>
            <div className="flex gap-2">
              <button className="flex justify-center items-center mt-5  cursor-pointer bg-black  outline-none border-none p-1 rounded-md text-white w-full hover:bg-[#5d5d5d]">
                <FontAwesomeIcon icon={faUserPlus} className="m-1" />
                Follow
              </button>
              <button className="flex justify-center items-center mt-5  cursor-pointer bg-black outline-none border-none p-1 rounded-md text-white w-full hover:bg-[#5d5d5d]">
                <FontAwesomeIcon icon={faPlus} className="m-1" />
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Doctordetails;
