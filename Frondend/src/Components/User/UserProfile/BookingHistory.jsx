import React, { useState } from "react";
import { Footer, Header, HistoryViewMore, Usersidebar } from "../..";
import dummy from "../../../assets/Public/dummy.jpg";

const BookingHistory = () => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <>
      {!viewMore ? <Header /> : ""}

      <div className="flex justify-center items-center p-24 gap-10">
        <Usersidebar />
        <div className="bg-white shadow-lg p-5 rounded-lg">
          <table className="min-w-full table-auto rounded-lg">
            <thead className="text-white text-sm bg-[#136a8a]">
              <tr>
                {[
                  "Profile Image",
                  "Doctor",
                  "Selected Date",
                  "Booking Status",
                  "Action",
                ].map((data, index) => (
                  <th className="px-4 py-3 text-left first:rounded-tl-lg last:rounded-tr-lg">
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">
                  <img src={dummy} alt="dr" className="w-9 h-9 rounded-full" />
                </td>
                <td className=" text-sm text-gray-700">Dr. Jasir</td>
                <td className=" text-sm text-gray-700">12/3/2024</td>
                {/* <td className=" text-sm ">
                  <div className="bg-yellow-100 rounded-2xl text-center text-yellow-800 border border-yellow-600 px-1 py-1">
                    Processing
                  </div>
                </td> */}
                <td className=" text-sm ">
                  <div className="bg-green-300 rounded-2xl text-center text-green-800 border border-green-800 px-1 py-1">
                    Completed
                  </div>
                </td>
                <td className=" text-sm text-gray-700">
                  <button
                    className="bg-black text-white p-1 rounded-2xl w-full"
                    onClick={() => setViewMore(true)}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
      {viewMore && <HistoryViewMore closeModal={()=> setViewMore(false)} />}
    </>
  );
};

export default BookingHistory;
