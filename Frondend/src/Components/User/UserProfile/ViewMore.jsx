import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewMore = ({ closeModal, viewMoreResult }) => {
  console.log("here is the datea", viewMoreResult);
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const handleCancelBooking = ({}) => {};

  return (
    <div
      className="fixed top-28 right-10 flex justify-center items-center"
      data-aos="fade-down"
    >
      <div className="relative bg-white shadow-2xl p-6 rounded-xl flex flex-col border">
        <div
          className="absolute top-[-0.75rem] right-[-9px] bg-slate-900 text-white rounded-full text-center w-7 h-7 flex justify-center items-center cursor-pointer text-sm"
          onClick={closeModal}
        >
          x
        </div>
        <div className="bg-slate-300 p-2 rounded-lg border border-slate-400">
          <span>Booking id:</span> <span>{viewMoreResult?.bookingId}</span>
        </div>
        <div className="bg-white mt-2 flex flex-col justify-center items-center shadow-lg p-4 rounded-lg">
          <div>
            <div>
              <p>Booking Date : {viewMoreResult?.slots?.bookedDate}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {viewMoreResult?.slots?.BookedSeats?.map((slot, index) => (
                <p
                  className="bg-yellow-200 border border-yellow-600 rounded-md text-center"
                  key={index}
                >
                  {slot}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <button
              className="bg-black text-white w-full rounded-xl px-4 py-1 text-sm"
              onClick={handleCancelBooking}
            >
              cancel booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
