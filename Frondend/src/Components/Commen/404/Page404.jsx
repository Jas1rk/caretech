import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-gray-800">OOPS!</h1>
        <h3 className="text-xl text-gray-800">
          404 - The page can't be found.
        </h3>
        <button
          className="mt-5 cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2x"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default Page404;
