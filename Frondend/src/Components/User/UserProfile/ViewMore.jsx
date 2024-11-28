import React from "react";

const ViewMore = ({closeModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="relative bg-white shadow-lg p-6 rounded-xl flex flex-col">
        <div className="absolute top-[-0.75rem] right-[-9px] bg-slate-900 text-white rounded-full text-center w-7 h-7 flex justify-center items-center cursor-pointer" onClick={closeModal}>
          x
        </div>
        <div className="bg-slate-300 p-2 rounded-lg border border-slate-400">
          <span>Booking id:</span> <span>kkkkkkkiiiiiiiiiiii99999999999</span>
        </div>
        <div className="bg-white mt-2 flex flex-col justify-center items-center shadow-lg p-4 rounded-lg">
          <div>
            <div>
              <p>Booking Date : 12/3/2024</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <p className="bg-yellow-200 border border-yellow-600 rounded-md text-center">
                hello
              </p>
              <p className="bg-yellow-200 border border-yellow-600 rounded-md text-center">
                hello
              </p>
              <p className="bg-yellow-200 border border-yellow-600 rounded-md text-center">
                hello
              </p>
              <p className="bg-yellow-200 border border-yellow-600 rounded-md text-center">
                hello
              </p>
            </div>
          </div>
          <div className="mt-3">
            <button className="bg-black text-white w-full rounded-xl px-2 py-1">
              cancel booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
