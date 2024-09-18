import React, { useState } from "react";
import { DoctorNavbar, DoctorProfileEdit } from "../..";
import { useSelector } from "react-redux";

const Doctorprofile = () => {
  const { doctorData } = useSelector((state) => state.doctor);
  const [isEdit, setIsedit] = useState(false);
  console.log("getting", doctorData);
  return (
    <>
      <DoctorNavbar />
      <div
        className={`flex flex-col justify-center items-center ${
          isEdit ? "blur-sm" : ""
        }`}
      >
        <h1 className="text-2xl text-black mt-28 pb-3 font-bold">Profile</h1>
        <div className="flex flex-col justify-center items-center bg-white drop-shadow-2xl shadow-2xl w-[350px]  sm:w-[550px] rounded-xl p-4">
          <div className="sm:flex">
            <img
              src={`../src/assets/images/${doctorData.profileimage}`}
              alt="doctorprofileimage"
              className="border-2 border-[#0f766e] rounded-sm w-[20%]  sm:w-[35%]  sm:rounded-md"
            />

            <div className="flex flex-col">
              <div className="bg-white drop-shadow-md shadow-2xl m-3 w-[80%] sm:w-[124%] rounded-xl flex flex-col justify-center items-center p-2">
                <div className="flex gap-1">
                  <h1 className=" text-black font-bold">{doctorData.drname}</h1>
                  <h1 className=" text-black font-bold">
                    {doctorData.drdegree}
                  </h1>
                </div>
                <h1 className=" text-black font-bold">{doctorData.drMobile}</h1>
                <h1 className=" text-black font-bold">{doctorData.drEmail}</h1>
                <h1 className=" text-black font-bold">
                  {doctorData.drSpecialization.categoryName}
                </h1>
                <h1 className="text-black font-bold">{`Experience: ${doctorData.experience} Year`}</h1>
              </div>
              <div className="bg-white drop-shadow-md  shadow-2xl m-3 w-[80%] sm:w-[124%] rounded-xl flex flex-col justify-center items-center p-2">
                <h1 className=" text-black font-bold">{`State: ${doctorData.state}`}</h1>

                <h1 className=" text-black font-bold">{`Location: ${doctorData.location}`}</h1>
                <h1 className=" text-black font-bold">{`Region: ${doctorData.country}`}</h1>
              </div>
            </div>
          </div>
          <div className="bg-white drop-shadow-md  shadow-2xl m-3 w-[100%] rounded-xl flex flex-col justify-center items-center p-2">
            <p className="text-start">{doctorData.about}</p>
          </div>
          <button
            className="cursor-pointer p-1 bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none  rounded-3xl text-white w-30 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
            onClick={() => setIsedit(true)}
          >
            Edit
          </button>
        </div>
      </div>

      {isEdit && <DoctorProfileEdit closeModal={() => setIsedit(false)} />}
    </>
  );
};

export default Doctorprofile;
