import React from "react";
import { toast } from "sonner";
import doctor_Api from "../../../service/Doctorinstance";

const ViewDetails = ({ closeModal, bookingResult }) => {
  const handleAccept = async (bookingId) => {
    try {
      const { data, status } = await doctor_Api.post("/doctor/change-status", {
        bookingId,
      });
      console.log(data)
      if ([200].includes(status)) toast.success(data.message);
      closeModal()
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if ([500].includes(status)) toast.error(data.message);
      }
    }
  };

  return (
    <>
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
            <span>{`Booking id:${bookingResult?.bookingId}`}</span>
          </div>
          <div className="bg-white mt-2 flex flex-col justify-center items-center shadow-lg p-4 rounded-lg">
            <div>
              <div>
                <p>{`Booking Date : ${bookingResult?.slots?.bookedDate}`}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {bookingResult?.slots?.BookedSeats.map((seat, index) => (
                  <p
                    className="bg-yellow-200 border border-yellow-600 rounded-md text-center"
                    key={index}
                  >
                    {seat}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <button
                className="bg-[#136a8a] text-white w-full rounded-lg px-4 py-1 text-sm"
                onClick={() => handleAccept(bookingResult?.bookingId)}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
