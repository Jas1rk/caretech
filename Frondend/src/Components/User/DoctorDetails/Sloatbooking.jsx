import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { backendUrl } from "../../../service/backendUrl";
import AllocatedTimes from "./AllocatedTimes";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";

const Sloatbooking = ({ closeModal, doctorid }) => {
  const [date, setDate] = useState();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { socket } = useSelector((state) => state.socket);

  const fetchTime = async (selectedDate) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/display-slots?doctorId=${doctorid}&selectedDate=${selectedDate}`
      );
      setResult(data);
      setError(null);
    } catch (error) {
      const { data, status } = error.response;
      if (status === 409) {
        setError(data.message);
        setResult(null);
      }
    }
  };

  const handleDate = useCallback(
    debounce((newDate) => {
      const selectedDate = newDate.toLocaleDateString();
      setDate(selectedDate);
      fetchTime(selectedDate);
    }, 300),
    []
  );

  const socketEvent = useCallback(() => {
    if (socket) {
      const allocateTime = (data) => {
        if (data.doctorId === doctorid) fetchTime();
      };
      const cancelTime = (data) => {
        if (data.doctorId === doctorid) fetchTime();
      };
      socket.on("slotAllocated", allocateTime);
      socket.on("canceltime", cancelTime);

      return () => {
        socket.off("slotAllocated", allocateTime);
        socket.off("canceltime", cancelTime);
      };
    }
  }, [socket, doctorid, date]);

  useEffect(() => {
    const cleanup = socketEvent();
    fetchTime(date);
    return cleanup;
  }, [socketEvent, date]);

  const slotStatuses = useMemo(
    () => [
      { color: "bg-green-600 border-green-400", label: "selected" },
      { color: "bg-[#eaff45] border-yellow-300", label: "available" },
      {
        color: "bg-[#989898] border-l-neutral-400",
        label: "not available",
      },
    ],
    []
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[80%] sm:w-[500px] relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <h2 className="text-md font-bold">Select a sloat</h2>
        <div className="flex gap-5">
          {slotStatuses.map((data, index) => (
            <div className="flex gap-1 justify-center items-center" key={index}>
              <div className={`w-3 h-3 border ${data.color}`}></div>
              <span className="text-sm">{data.label}</span>
            </div>
          ))}
        </div>
        <div className="items-center justify-center  flex m-3">
          <Calender
            className="border-none rounded-lg bg-white shadow-lg p-2"
            onChange={handleDate}
            value={date}
            minDate={new Date()}
          />
        </div>
        <p className="text-sm">selected Date: {date}</p>
        {date && <AllocatedTimes timeResult={result} errorMessage={error} />}
      </div>
    </div>
  );
};

export default Sloatbooking;
