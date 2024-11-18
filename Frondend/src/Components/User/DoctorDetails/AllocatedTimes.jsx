import React, { useState } from "react";
import { MakingPayment } from "../..";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";

const AllocatedTimes = ({ timeResult, errorMessage, selectedDate }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleSlotSelected = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((selected) => selected !== time));
      return;
    }
    if (selectedTimes.length < 4) {
      setSelectedTimes([...selectedTimes, time]);
    } else {
      toast.info("only 4 slots can select");
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-md mt-2 mb-2">
        {!timeResult ? (
          <div className="p-3">
            <p className="font-bold text-sm text-center">{errorMessage}</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-center font-bold">Slot Fee ₹1000</p>
            <div className="grid grid-cols-4 gap-4 p-3">
              {timeResult.map((slot, tindex) =>
                slot.times.map((time, index) => (
                  <div
                    className={`p-1 flex justify-center items-center gap-1 rounded-md cursor-pointer ${
                      selectedTimes.includes(time)
                        ? "bg-[#35da26] border border-green-300"
                        : "bg-[#eaff45] border border-yellow-300"
                    }`}
                    key={`${tindex}-${index}`}
                    onClick={() => handleSlotSelected(time)}
                  >
                    <FontAwesomeIcon icon={faCouch} />
                    <p>{time}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {timeResult && selectedTimes.length > 0 && (
          <div>
            <p className="text-sm font-bold text-center">{`Total: ₹${
              1000 * selectedTimes.length
            }`}</p>
          </div>
        )}
      </div>
      {timeResult && selectedTimes.length > 0 && (
        <MakingPayment
          selectedDate={selectedDate}
          selectedTimes={selectedTimes}
        />
      )}
    </>
  );
};

export default AllocatedTimes;
