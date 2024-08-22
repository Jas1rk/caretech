import React from "react";
import Logo from "../../../assets/Logo/Logo";

const Doctorotp = () => {

    const renderInput = ()=>{
  
        return<input type="text" className="w-16 h-12 bg-white border  border-solid   outline-none rounded-lg text-center mr-3 text-xl focus:ring-2"  />

    }
  return (
    <>
      <Logo className="mb-8" />
      <div className="bg-white flex flex-col justify-center items-center w-40 m-auto border rounded-2xl p-5">
        <h1 className="text-2xl font-bold p-5">Enter OTP</h1>
        <div className="p-2">
          {renderInput()}
          {renderInput()}
          {renderInput()}
          {renderInput()}
          {renderInput()}
          {renderInput()}
        </div>
        <button className="bg-slate-800 w-20 p-1 rounded-3xl mt-3 text-stone-100">Verify</button>
      </div>
    </>
  );
};

export default Doctorotp;
