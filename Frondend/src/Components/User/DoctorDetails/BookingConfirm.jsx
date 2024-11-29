import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BookingConfirm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 bg-black   bg-opacity-60 flex justify-center items-center z-50">
        <div className="relative bg-white p-8 rounded-xl w-[80%] sm:w-[550px] shadow-lg flex flex-col items-center">
          <div
            className="absolute -top-10 bg-green-500 p-5 rounded-full shadow-lg flex items-center justify-center"
            style={{ width: "80px", height: "80px" }}
          >
            <FontAwesomeIcon icon={faCheck} className="text-3xl text-white" />
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your booking has been successfully processed. Thank you for
              choosing our service!
            </p>
            <button
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => navigate("/booking-history")}
            >
              Find Your Bookings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirm;
