import React, { useEffect, useState, useMemo } from "react";
import doctor_Api from "../../../service/Doctorinstance";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const DisplaySlot = ({ doctorid }) => {
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchAndTime = async () => {
      try {
        const { data } = await doctor_Api.get(
          `/doctor/doctor-get-slot?doctorID=${doctorid}`
        );
        setResult(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAndTime();
  }, []);

  const handleDeleteTime = (times) => {
    toast.success(times);
  };

  const renderP = useMemo(() => [{ pValue: "Date" }, { pValue: "Times" }], []);
  return (
    <div className="shadow-md mt-5 rounded-lg p-3">
      {!result ? (
        <div className="p-5 flex flex-col justify-center items-center">
          <FontAwesomeIcon icon={faFaceSadTear} bounce className="text-5xl"/>
          <h2 className="font-bold">No Dates and Times are allocated</h2>
        </div>
      ):(
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {renderP.map((data, index) => (
              <th className="py-3 px-6 text-center" key={index}>
                {data.pValue}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="p-10">
          {result &&
            result.map((slot, index) =>
              slot.TimeAllocate.map((timeslot, timeslotIndex) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100 mb-4"
                  key={`${index}-${timeslotIndex}`} 
                >
                  <td className="py-3 px-6 text-left">{timeslot.storedDate}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex gap-5 justify-end">
                      {timeslot.selectedTimes.map((times, timesIndex) => (
                        <div
                          className="relative bg-orange-100 rounded-md mt-1 p-0.5 border border-orange-300 flex items-center justify-center"
                          style={{ width: "70px", height: "35px" }}
                          key={timesIndex}
                        >
                          <button
                            className="absolute left-0 top-0.5 transform -translate-y-1/2 -translate-x-1/2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center z-10"
                            style={{ fontSize: "10px" }}
                            onClick={() => handleDeleteTime(times)}
                          >
                            x
                          </button>
                          <div className="text-center text-sm">{times}</div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>

      )}
    </div>
  );
};

export default DisplaySlot;
