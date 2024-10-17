import React, { useState } from "react";
import { DoctorNavbar } from "../..";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Sloatallocation = () => {
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [showTime, setShowtime] = useState(false);
  const [date, setDate] = useState();

  const handleDate = (selectedDate) => {
    setDate(selectedDate.toLocaleDateString());
    setShowtime(true);
  };

  const renderSpan = () => {
    return [
      { color: "bg-green-600 border-green-400", label: "selected" },
      { color: "bg-[#eaff45] border-yellow-300", label: "available" },
      {
        color: "bg-[#989898] border-l-neutral-400",
        label: "not available",
      },
    ];
  };

  console.log("checked", date);

  return (
    <>
      <DoctorNavbar />
      <h1 className="pt-24 text-center font-bold text-lg">Allocate a Slot</h1>

      <div className=" p-10 m-10 rounded-lg shadow-xl flex gap-10">
        <div className="flex flex-col">
          <div className="flex gap-5">
            {renderSpan().map((item, index) => (
              <div
                key={index}
                className="flex gap-1 justify-center items-center"
              >
                <div className={`w-3 h-3 border ${item.color}`}></div>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          <Calender
            className="border-none rounded-lg bg-white shadow-lg p-2"
            onChange={handleDate}
            value={date}
            minDate={new Date()}
          />
        </div>
        {showTime && (
          <div>
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Sloatallocation;
