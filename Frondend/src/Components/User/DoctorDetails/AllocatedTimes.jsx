import React, { useState } from "react";
import { MakingPayment } from "../..";
import { toast } from "sonner";

const AllocatedTimes = ({ timeResult, errorMessage }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleSlotSelected = (time) => {
    if (selectedTimes.length === 4) {
      toast.error("You can select only 4 slot");
      return;
    }
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((selected) => selected !== time));
      return;
    }
    setSelectedTimes([...selectedTimes, time]);
  
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-md mt-2 mb-2">
        {!timeResult ? (
          <div className="p-3">
            <p className="font-bold text-sm text-center">{errorMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 p-3">
            {timeResult.map((slot, tindex) =>
              slot.times.map((time, index) => (
                <div
                  className={`p-1 rounded-md cursor-pointer ${
                    selectedTimes.includes(time)
                      ? "bg-[#35da26] border border-green-300"
                      : "bg-[#eaff45] border border-yellow-300"
                  }`}
                  key={`${tindex}-${index}`}
                >
                  <p
                    className="text-center"
                    onClick={() => handleSlotSelected(time)}
                  >
                    {time}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {timeResult && selectedTimes.length > 0 && <MakingPayment />}
    </>
  );
};

export default AllocatedTimes;
