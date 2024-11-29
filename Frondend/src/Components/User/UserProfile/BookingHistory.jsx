import React, { useEffect, useState } from "react";
import { Footer, Header, HistoryViewMore, Usersidebar } from "../..";
import dummy from "../../../assets/Public/dummy.jpg";
import { useSelector } from "react-redux";
import user_Api from "../../../service/Userinstance";
import { toast } from "sonner";

const BookingHistory = () => {
  const [viewMore, setViewMore] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [historyResult, setHistoryResult] = useState(null);
  

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, status } = await user_Api.get(
          `/view-booking-history?userId=${userData.id}`
        );
        if ([200].includes(status)) setHistoryResult(data);
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          if ([500].includes(status)) toast.error(data.message);
        }
      }
    };
    fetchHistory();
  }, []);

  const handleView = (history) => {
    setViewMore(history)
  }

  return (
    <>
      <Header />
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
              {historyResult?.map((history, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <img
                      src={`../src/assets/images/${history?.doctorDetails[0]?.profileImageOfDoctor}`}
                      alt="dr"
                      className="w-9 h-9 rounded-full"
                    />
                  </td>
                  <td className=" text-sm text-gray-700">{`Dr.${history?.doctorDetails[0]?.nameOfDoctor} ${history?.doctorDetails[0]?.degreeOfDoctor}`}</td>
                  <td className=" text-sm text-gray-700">
                    {history?.slots?.bookedDate}
                  </td>
                  <td className=" text-sm ">
                    {history?.doctorDetails[0]?.sotBookingForPatients[0]
                      ?.bookingStatus === "Processing" ? (
                      <div className="bg-yellow-100 rounded-2xl text-center text-yellow-800 border border-yellow-600 px-1 py-1">
                        {
                          history?.doctorDetails[0]?.sotBookingForPatients[0]
                            ?.bookingStatus
                        }
                      </div>
                    ) : (
                      <td className=" text-sm ">
                        <div className="bg-green-300 rounded-2xl text-center text-green-800 border border-green-800 px-1 py-1">
                          {
                            history?.doctorDetails[0]?.sotBookingForPatients[0]
                              ?.bookingStatus
                          }
                        </div>
                      </td>
                    )}
                  </td>

                  <td className=" text-sm text-gray-700">
                    <button
                      className="bg-black text-white p-1 rounded-2xl w-full"
                      onClick={() => handleView(history)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
      {viewMore && (
        <HistoryViewMore
          closeModal={() => setViewMore(false)}
          viewMoreResult={viewMore}
        />
      )}
    </>
  );
};

export default BookingHistory;
