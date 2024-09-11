import React from "react";
import { Formik, useFormik } from "formik";
import { DoctorNavbar } from "../..";
import { useSelector } from "react-redux";

const Doctorprofile = () => {
  const { doctorData } = useSelector((state) => state.doctor);
  console.log("getting", doctorData);
  return (
    <>
      <DoctorNavbar />

      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl text-black mt-32 font-bold">profile</h1>
        <div className="flex flex-col justify-center items-center bg-white drop-shadow-2xl shadow-2xl mt-12 w-[350px] rounded-xl p-3">
          <img
            src={`../src/assets/images/${doctorData.profileimage}`}
            alt="doctorprofileimage"
            className="border-2 border-[#0f766e]"
          />
          <div className="bg-white drop-shadow-md border-2 border-slate-900 shadow-2xl m-3 w-[70%] rounded-xl flex flex-col justify-center items-center p-2">
            <div className="flex gap-3">
              <h1 className=" text-black font-bold">{doctorData.drname}</h1>
              <h1 className=" text-black font-bold">{doctorData.drdegree}</h1>
            </div>
            <h1 className=" text-black font-bold">{doctorData.drMobile}</h1>
            <h1 className=" text-black font-bold">{doctorData.drEmail}</h1>
            <h1 className=" text-black font-bold">
              {doctorData.drSpecialization.categoryName}
            </h1>
          </div>
          <button className="  cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none  rounded-3xl text-white w-30 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl">
            view more
          </button>
        </div>
      </div>
    </>
  );
};

export default Doctorprofile;
