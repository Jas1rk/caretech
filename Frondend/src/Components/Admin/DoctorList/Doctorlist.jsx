import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar } from "../..";
import dummyImgae from "../../../assets/Public/doctorimage.png";
import dymmy from "../../../assets/Public/dummy.jpg";
import { fetchNewDoctors } from "../../../Redux/Admin/AdminThunk";
import { useDispatch, useSelector } from "react-redux";

const Doctorlist = () => {
  const [viewMore, setViewMore] = useState(false);
  const { doctorsList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNewDoctors());
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="flex pt-12">
        <AdminSidebar />
        <div className="doctor-listing mt-8 w-[70%] bg-white rounded-2xl shadow-2xl p-4 drop-shadow-2xl flex flex-col">
          <div className="doctor-search flex justify-center items-center">
            <input
              type="search"
              placeholder="Search Doctor"
              className="p-2 border border-solid m-5 outline-none rounded-3xl w-[calc(50%-20px)] focus:border-[#a65a50]"
            />
          </div>

          <div className="doctors m-1 ">
            <div
              className="ml-10 flex  gap-5 overflow-x-auto overflow-y-hidden  p-5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {doctorsList.map((dr,index)=>(

              <div className="dr-info bg-white border shadow-md  w-[30%] rounded-lg p-2" key={index}>
                {!viewMore  ? (
                  <>
                    <div className="circle rounded-full w-28 h-28 flex justify-center items-center bg-[#a65a50] overflow-hidden  mb-[10px] mx-auto">
                      <img
                        src={dummyImgae}
                        alt="doctor"
                        className="mt-[10px] h-auto w-[100%]"
                      />
                    </div>
                    <div className="about-doctor bg-white border rounded-lg   m-3 p-3">
                      <div className="name-doctor flex justify-center items-center gap-1">
                        <span className="font-bold">Dr.{dr.nameOfDoctor}</span>
                        <span className="font-bold">{dr.degreeOfDoctor}</span>
                      </div>

                      <button
                        className="bg-[#a65a50] text-white  flex justify-center items-center m-auto w-[6.25rem] rounded-3xl"
                        onClick={() => setViewMore(true)}
                      >
                        view more
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={`../src/assets/images/${dr.certificate}`}
                      alt=""
                      className="w-[60%] m-auto rounded-lg border-2 flex justify-center items-center border-[#a65a50]"
                    />
                    <div className="about-doctor bg-white border rounded-lg shadow-md m-3 p-3">
                      <div className="name-doctor flex flex-col justify-center items-center">
                        <p className="font-bold">{dr.category.categoryName}</p>
                        <p className="font-bold text-sm">{dr.emailOfDoctor}</p>
                        <p className="font-bold">{dr.mobileOfDoctor}</p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <button className="bg-[#a65a50] text-white   w-[6.25rem] rounded-3xl">
                          verify
                        </button>
                        <button
                          className="bg-[#361c19] text-white   w-[6.25rem] rounded-3xl"
                          onClick={() => setViewMore(false)}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorlist;
