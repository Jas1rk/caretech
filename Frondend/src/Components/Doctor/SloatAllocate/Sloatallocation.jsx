import React, { useState, useMemo } from "react";
import { DoctorNavbar } from "../..";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "sonner";

const formatTime12Hour = (time24) => {
  let [hours, minutes] = time24.split(":");
  let formatAmPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${formatAmPm}`;
};

const getCurrentTime24Hour = () => {
  let date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Sloatallocation = () => {
  const [startTime, setStartTime] = useState(getCurrentTime24Hour());
  const [date, setDate] = useState();
  const [timeError, setTimeError] = useState(false);

  const handleDate = (selectedDate) => {
    setDate(selectedDate.toLocaleDateString());
  };

  const handleTime = (event) => {
    const selectTime = event.target.value;
    if (selectTime >= "10:00" && selectTime <= "23.00") {
      setStartTime(selectTime);
      setTimeError(false)
    } else {
      setTimeError(true);
    }
  };

  const slotStatuses = useMemo(
    () => [
      { color: "bg-green-600 border-green-400", label: "Selected" },
      { color: "bg-[#eaff45] border-yellow-300", label: "Today" },
      { color: "bg-[#989898] border-l-neutral-400", label: "Not Available" },
    ],
    []
  );

  return (
    <>
      <DoctorNavbar />
      <h1 className="pt-24 text-center font-bold text-lg">Allocate a Slot</h1>

      <div className="p-10 m-10 rounded-lg shadow-xl flex gap-10">
        <div className="flex flex-col">
          <div className="flex gap-5">
            {slotStatuses.map((item, index) => (
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

        {date && (
          <>
            <div className="flex flex-col ">
              <h2 className="font-bold">Allocate times of you</h2>
              <p
                className={`text-sm  ${
                  timeError ? "bg-red-500 border-red-500 text-white" : "bg-[#85a6ff] text-white"
                } rounded-md border-blue-400 p-1`}
              >
                {timeError
                  ? "Time must be between 10:00 AM and 12:00 PM."
                  : "Patient booking starts 10:00 AM onwards up to 10:00 PM"}
              </p>
              <div className="flex gap-1 mt-2">
                <div className="flex gap-2">
                  <p className="items-center justify-center flex">Time:</p>
                  <span className="flex items-center justify-center font-bold">
                    {formatTime12Hour(startTime)}
                  </span>
                  <input
                    type="time"
                    className="border p-1 rounded-md focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg outline-none"
                    value={startTime}
                    onChange={handleTime}
                  />
                </div>
                <button className="bg-black text-white p-1 rounded-md">
                  add
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sloatallocation;
