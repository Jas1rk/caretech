import React, { useState } from "react";
import { DoctorNavbar } from "../..";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Sloatallocation = () => {

  const [startTime, setStartTime] = useState(getCurrentTime());
  // const [endTime, setEndTime] = useState('12:00');
  const [date, setDate] = useState();
  

  const handleDate = (newDate) => {
    const selectedDate = new Date(newDate.setHours(0, 0, 0, 0))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
   
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const previousMonth = new Date(today)
    previousMonth.setMonth(today.getMonth() - 1)

    const previousYear = new Date(today)
    previousYear.setFullYear(today.getFullYear() - 1)

    if(selectedDate.getDate() === yesterday.getDate()){
      alert("You have selected the yesterday date")
    }
    
  }

  return (
    <>
      <DoctorNavbar />
      <h1 className="pt-24 text-center font-bold text-lg">Allocate a Slot</h1>
      <div className=" p-10 m-10 rounded-lg shadow-xl flex gap-10">
        <div className="">
          <Calender
            className="border-none rounded-lg bg-white shadow-lg p-2"
            onChange={handleDate}
            value={date}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          {/* <label htmlFor="endTime">End Time:</label>
      <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} /> */}
        </div>
      </div>
    </>
  );
};

export default Sloatallocation;
