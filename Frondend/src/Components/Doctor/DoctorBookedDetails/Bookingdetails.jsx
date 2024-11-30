import React, { useEffect, useState } from "react";
import { DoctorNavbar, DoctorViewBookingDetails, Pagination } from "../..";
import { toast } from "sonner";
import doctor_Api from "../../../service/Doctorinstance";
import { useSelector } from "react-redux";

const Bookingdetails = () => {
  const [openView, setOpenView] = useState(false);
  const [result, setResult] = useState(null);
  const { doctorData } = useSelector((state) => state.doctor);
  

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await doctor_Api(
          `/doctor/fetch-booking-details?doctor_id=${doctorData.id}`
        );
      } catch (error) {
        if (error.message) {
          const { data, status } = error.response;
          if ([500].includes(status)) toast.error(data.message);
        }
      }
    };
    fetchBookingDetails();
  }, []);

  return (
    <>
      <DoctorNavbar />
      <h1 className="pt-24 text-center font-bold text-lg">Your Bookings</h1>
      <div className="overflow-x-auto mx-auto mt-6 max-w-5xl rounded-xl">
        <table className="table-auto w-full bor text-left ">
          <thead>
            <tr className="bg-black text-white">
              {["#", "User Name", "Appointment Date", "Status", "Action"].map(
                (table, index) => (
                  <th className=" px-4 py-2" key={index}>
                    {table}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array(6)
              .fill()
              .map((_, data) => (
                <tr key={data}>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">John Doe</td>
                  <td className="border border-gray-300 px-4 py-2">
                    2024-12-01
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {/* <div className="bg-green-700 text-white rounded-xl text-center">confirmed</div> */}
                    <div className="bg-yellow-700 text-white rounded-xl text-center">
                      processing
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-black text-white rounded-md px-4 py-1"
                      onClick={() => setOpenView(true)}
                    >
                      view
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      {openView && (
        <DoctorViewBookingDetails closeModal={() => setOpenView(false)} />
      )}
    </>
  );
};

export default Bookingdetails;
