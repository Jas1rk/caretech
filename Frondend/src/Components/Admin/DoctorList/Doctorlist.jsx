import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar, ConfirmAlert } from "../..";
import { fetchNewDoctors } from "../../../Redux/Admin/AdminThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import admin_Api from "../../../service/AxiosInstance";

const Doctorlist = () => {
  const [viewMore, setViewMore] = useState(null);
  const { doctorsList } = useSelector((state) => state.admin);
  const [searchDr, setSearchDr] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewDoctors());
  }, []);

  const handleVerify = async (drid, drName, drEmail, drDegree) => {
    ConfirmAlert("Are you sure to verify").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await admin_Api.post("/admin/verifydr", {
            drid,
            drName,
            drEmail,
            drDegree,
          });
          toast.success("Doctor verified successfully");
          dispatch(fetchNewDoctors());
          setViewMore(null);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        setViewMore(null);
      }
    });
  };
  const handleUnVerify = (drid, drName, drEmail) => {
    ConfirmAlert("are you sure to unverify this doctor").then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            await admin_Api.post("/admin/unverifydr", {
              drid,
              drName,
              drEmail,
            });
            toast.success("Doctor unverified successfully");
            dispatch(fetchNewDoctors());
            setViewMore(null);
          } catch (error) {
            toast.error(error.message);
          }
        } else {
          setViewMore(null);
        }
      }
    );
  };

  const filterDoctors = doctorsList.filter((doctor) => {
    return doctor.nameOfDoctor.toLowerCase().includes(searchDr.toLowerCase());
  });

  return (
    <>
      <AdminNavbar />
      <div className="flex pt-12">
        <AdminSidebar />
        <div className="doctor-listing mt-8 w-[70%] bg-white rounded-2xl shadow-2xl p-4 drop-shadow-2xl">
          <div className="doctor-search flex justify-center items-center">
            <input
              type="search"
              placeholder="Search Doctor"
              className="p-2 border border-solid m-5 outline-none rounded-3xl w-[calc(50%-20px)] focus:border-[#a65a50]"
              value={searchDr}
              onChange={(event) => setSearchDr(event.target.value)}
            />
          </div>

          <div className="m-2">
            {filterDoctors.length > 0 ? (
              <div
                className="ml-10 flex  gap-5 overflow-x-auto overflow-y-hidden  p-5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filterDoctors.map((dr, index) => (
                  <div
                    className={`dr-info bg-white border shadow-md  w-[30%] rounded-lg p-2 transition-transform ${
                      viewMore === dr._id
                        ? "scale-110 bg-gray-100 "
                        : "scale-100 bg-white"
                    }`}
                    key={index}
                  >
                    {viewMore === dr._id ? (
                      <>
                        <img
                          src={`../src/assets/images/${dr?.certificate}`}
                          alt=""
                          className="w-[60%] m-auto rounded-lg border-2 flex justify-center items-center border-[#a65a50]"
                        />
                        <div className="about-doctor bg-white border rounded-lg shadow-md m-3 p-3">
                          <div className="name-doctor flex flex-col justify-center items-center ">
                            <p className="font-bold text-sm">
                              {dr.categoryData.categoryName}
                            </p>
                            <p className="font-bold text-sm">
                              {dr?.emailOfDoctor}
                            </p>
                            <p className="font-bold">{dr?.mobileOfDoctor}</p>
                          </div>
                          <div className="flex flex-col justify-center items-center gap-2">
                            <button
                              className="bg-[#a65a50] text-white   w-[6.25rem] rounded-3xl"
                              onClick={() =>
                                handleVerify(
                                  dr._id,
                                  dr.nameOfDoctor,
                                  dr.emailOfDoctor,
                                  dr.degreeOfDoctor
                                )
                              }
                            >
                              verify
                            </button>
                            <button
                              className="bg-[#361c19] text-white   w-[6.25rem] rounded-3xl"
                              onClick={() =>
                                handleUnVerify(
                                  dr._id,
                                  dr.nameOfDoctor,
                                  dr.emailOfDoctor
                                )
                              }
                            >
                              cancel
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={`../src/assets/images/${dr.profileImageOfDoctor}`}
                          alt="doctor"
                          className="circle rounded-full w-28 h-28 flex justify-center items-center m-auto border-4 border-[#a65a50] object-center object-cover"
                        />

                        <div className="about-doctor bg-white border rounded-lg  flex flex-col m-1 p-2">
                          <div className="name-doctor flex justify-center items-center gap-1">
                            <span className="font-bold text-sm ">
                              Dr.{dr.nameOfDoctor}
                            </span>
                            <span className="font-bold text-sm ">
                              {dr.degreeOfDoctor}
                            </span>
                          </div>

                          <button
                            className="bg-[#a65a50] text-white  flex justify-center items-center m-auto w-[6.25rem] rounded-3xl"
                            onClick={() => setViewMore(dr._id)}
                          >
                            view more
                          </button>
                        </div>
                        <div className="justify-center items-center m-auto flex mt-6">
                          {dr.isVerified ? (
                            <p className="text-center text-sm  border border-[#146716] bg-[#125516] text-white rounded-3xl  w-[68px] ">
                              verified
                            </p>
                          ) : (
                            <p className="text-center text-sm  border border-[#b10303] bg-[#920a0a] text-white rounded-3xl  w-[74px] ">
                              unverified
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="bg-[#a65a50] text-white flex justify-center items-center p-3">
                No docotors
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorlist;
