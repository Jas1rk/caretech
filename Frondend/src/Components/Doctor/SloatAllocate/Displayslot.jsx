import React, { useMemo } from "react";

const DisplaySlot = () => {
  const renderP = useMemo(() => [{ pValue: "Date" }, { pValue: "Times" }], []);
  return (
    <div className="shadow-md mt-5 rounded-lg p-3">
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
          <tr className="border-b border-gray-200 hover:bg-gray-100 mb-4">
            <td className="py-3 px-6 text-left">Example Date</td>

            <div className="flex gap-5 justify-end">
              {Array(8)
                .fill()
                .map((_, subIndex) => (
                  <div
                    className="relative bg-orange-100 rounded-md mt-1 p-0.5 border border-orange-300 flex items-center justify-center"
                    key={subIndex}
                    style={{ width: "70px", height: "35px" }}
                  >
                    <button
                      className="absolute left-0 top-0.5 transform -translate-y-1/2 -translate-x-1/2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center z-10"
                      style={{ fontSize: "10px" }}
                    >
                      x
                    </button>
                    <div className="text-center text-sm">12:00</div>
                  </div>
                ))}
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplaySlot;
