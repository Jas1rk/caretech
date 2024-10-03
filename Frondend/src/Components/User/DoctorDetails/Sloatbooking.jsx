import React, { useState } from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Sloatbooking = ({ closeModal }) => {
  const [date, setDate] = useState(new Date());
  const handleDate = (newDate) => {
    setDate(newDate);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[80%] sm:w-[500px] relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <h2 className="text-md font-bold">Select a sloat</h2>
        <div className="flex gap-5">
          <div className="flex gap-1 justify-center items-center">
            <div className="bg-green-600 w-3 h-3 border border-green-400"></div>
            <span className="text-sm">selected</span>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <div className="bg-[#eaff45] w-3 h-3 border border-yellow-300"></div>
            <span className="text-sm">available</span>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <div className="bg-[#989898] border border-l-neutral-400 w-3 h-3"></div>
            <span className="text-sm">not available</span>
          </div>
        </div>
        <div className="items-center justify-center  flex m-3">
          <Calender
            className="border-none rounded-lg bg-white shadow-lg p-2"
            onChange={handleDate}
            value={date}
          />
        </div>
        <p className="text-sm">selected Date: {date.toDateString()}</p>
        <div className="flex items-end justify-end">
          <button className="p-2 rounded-lg text-white text-sm bg-gradient-to-r from-teal-700 to-blue-900">Make payment</button>
        </div>
      </div>
    </div>
  );
};

export default Sloatbooking;
