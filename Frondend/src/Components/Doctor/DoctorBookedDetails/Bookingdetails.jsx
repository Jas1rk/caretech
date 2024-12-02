import React, { useEffect, useState } from "react";
import { DoctorNavbar, DoctorViewBookingDetails, Pagination } from "../..";
import { toast } from "sonner";
import doctor_Api from "../../../service/Doctorinstance";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Bookingdetails = () => {
  const [openView, setOpenView] = useState(false);
  const [result, setResult] = useState(null);
  const { doctorData } = useSelector((state) => state.doctor);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const { data, status } = await doctor_Api.get(
          `/doctor/fetch-booking-details?doctor_id=${doctorData.id}`
        );
        if ([200].includes(status)) setResult(data);
      } catch (error) {
        if (error.message) {
          const { data, status } = error.response;
          if ([500].includes(status)) toast.error(data.message);
        }
      }
    };
    fetchBookingDetails();
  }, [doctorData.id]);

  /// pagination logic

  return (
    <>
      <DoctorNavbar />
      <h1 className="pt-24 text-center font-bold text-lg">Your Bookings</h1>
      <div className="overflow-x-auto mx-auto mt-6 max-w-5xl rounded-xl">
        <table className="table-auto w-full bor text-left ">
          <thead>
            <tr className="bg-black text-white">
              {[
                "#",
                "Profile",
                "User Name",
                "Appointment Date",
                "Cost",
                "Status",
                "Action",
              ].map((table, index) => (
                <th className=" px-4 py-2" key={index}>
                  {table}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result?.fetchDetails?.map((bookings, index) => {
              const correspondingData = result.fetchBooking.find(
                (book) =>
                  book.bookingId === bookings.sotBookingForPatients.paymentId
              );
              const date = correspondingData?.slots.bookedDate;
              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2">
                    {bookings?.userDetails[0]?.profileImage ? (
                      <img
                        src={`../src/assets/images/${bookings?.userDetails[0]?.profileImage}`}
                        alt="dr"
                        className="w-9 h-9 rounded-full"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="" />
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {bookings?.userDetails[0]?.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{date}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {`₹ ${bookings?.sotBookingForPatients?.bookingCost}`}
                  </td>

                  <td className="border border-gray-300 px-2 py-2">
                    <div
                      className={`${
                        bookings?.sotBookingForPatients?.bookingStatus ===
                        "Processing"
                          ? "bg-yellow-700"
                          : "bg-green-700"
                      } text-white rounded-xl text-center`}
                    >
                      {bookings?.sotBookingForPatients?.bookingStatus ===
                      "Processing"
                        ? "processing"
                        : "confirmed"}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className={`bg-black text-white rounded-md px-4 py-1 ${
                        bookings?.sotBookingForPatients?.bookingStatus ===
                        "Confirmed"
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={() => setOpenView(correspondingData)}
                      disabled={
                        bookings?.sotBookingForPatients?.bookingStatus ===
                        "Confirmed"
                      }
                    >
                      view
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination />
      {openView && (
        <DoctorViewBookingDetails
          closeModal={() => setOpenView(false)}
          bookingResult={openView}
        />
      )}
    </>
  );
};

export default Bookingdetails;
