import React, { useRef } from "react";


const AllocatedTimes = ({ timeResult,errorMessage }) => {
  console.log("and we got the result ", timeResult);
  return (
    <div className="bg-white shadow-lg rounded-md mt-2 mb-2">
      <div className="grid grid-cols-4 gap-4 p-3">
        {!timeResult ? (
          
          <div className="">
            <p className="font-bold text-sm">{errorMessage}</p>

          </div>
        ) : (
         
          timeResult.map((slot, tindex) =>
            slot.times.map((time, index) => (
              <div
                className="bg-[#eaff45] border border-yellow-300 p-1 rounded-md cursor-pointer"
                key={`${tindex}-${index}`}
              >
                <p className="text-center">{time}</p>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AllocatedTimes;
