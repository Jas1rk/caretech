import React, { useEffect, useState } from "react";
import useFetchDoctor from "../../../Hooks/UseFetchDoctor";
import { useLocation, useNavigate } from "react-router-dom";
import dummy from "../../../assets/Public/dummy.jpg";
import { DoctorSloatBooking, Footer, Header, Warning } from "../..";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faPlus,
  faMessage,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import user_Api from "../../../service/Userinstance";
import { useSelector } from "react-redux";

const Doctordetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryparams = new URLSearchParams(location.search);
  const doctorid = queryparams.get("doctorid");
  const { doctor } = useFetchDoctor(doctorid);
  const { userData, isAuthUser } = useSelector((state) => state.user);
  const [openBookPage, setOpenBookPage] = useState(false);

  const handleBookNow = async () => {
    if (!isAuthUser) {
      const result = await Warning();

      if (result.isConfirmed) navigate("/login");
      return;
    }
    setOpenBookPage(true);
  };

  // useEffect(() => {
  //   const getUserData = JSON.parse(sessionStorage.getItem('userData'));
  //   console.log("inside useEffect",getUserData)
  //   if (getUserData) {
  //     setLocalUserData(getUserData);
  //   }
  // }, [sessionStorage.getItem('userData')]);

  // const handleFollowDr = async (drid) => {
  //   try {
  //     if (usertoken) {
  //       const { data } = await user_Api.post("/follow-doctor", {
  //         drid,
  //         userid: userData.id,
  //       });

  //       const updatedUserData = {
  //         ...userData,
  //         followingDoctors: data.findUser.followingDoctors,
  //       };
  //       console.log("after api response", updatedUserData);
  //       sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
  //       console.log("inside the follow  function", localUserData);
  //       setLocalUserData(updatedUserData);
  //       toast.success("Added doctor to your list");
  //       console.log(
  //         "getting inside follow function",
  //         JSON.parse(sessionStorage.getItem("userData"))
  //       );
  //     } else {
  //       toast.error("Please login to follow doctor");
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  return (
    <>
      {!openBookPage ? <Header /> : ""}

      <div className={`p-10 flex gap-5 ${openBookPage ? "blur-md" : ""}`}>
        <div className=" flex justify-center  items-center drop-shadow-2xl shadow-2xl p-3 gap-5 rounded-lg w-[55%] mt-[85px]">
          <img
            src={`../src/assets/images/${doctor?.profileImageOfDoctor}`}
            alt="doctorprofileimage"
            className="w-64 h-80 rounded-lg"
          />
          <div className="flex flex-col">
            <div className="shadow-md p-4 rounded-lg w-full">
              <div className="flex gap-1">
                <h1 className="text-lg font-bold">{`Dr.${doctor?.nameOfDoctor}`}</h1>
                <span className="text-lg font-bold">
                  {doctor?.degreeOfDoctor}
                </span>
              </div>
              <div className="flex gap-1">
                <h1 className="font-bold">Specialization: </h1>
                <span>{doctor?.categoryData?.categoryName}</span>
              </div>
              <div className="flex gap-1">
                <h1 className="text-lg font-bold">Followers: </h1>
                <span className="text-lg">35k</span>
              </div>
              <h1>{doctor?.yearsOfExperience} Years of Experience</h1>
              <h1>Nation: {doctor?.countryOfDoctor}</h1>
              <h1>Time:14:00 To 18:00</h1>
              <div className="flex flex-col">
                <h1 className="font-bold">
                  Rating:
                  <div className="flex gap-1">
                    {Array(5)
                      .fill()
                      .map((index) => (
                        <p key={index}>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-400"
                          />
                        </p>
                      ))}
                  </div>
                </h1>
              </div>
            </div>
            <button
              className="flex justify-center items-center mt-5  cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-1 rounded-md text-white w-full transform transition duration-500 ease-in-out hover:scale-110 "
              onClick={handleBookNow}
            >
              Book now
            </button>
            <button className="flex justify-center items-center mt-5 border-2 border-[#cfaaaa] cursor-pointer bg-[#e7e7e7]  p-1 rounded-md text-black w-full transform transition duration-500 ease-in-out hover:scale-110">
              <FontAwesomeIcon icon={faMessage} className="m-1" />
              Message
            </button>
            <div className="flex gap-2">
              {/* {doctor?._id &&
              localUserData?.followingDoctors?.find(
                (doc) =>
                  doc.doctorId === doctor._id && doc.followingStatus === true
              ) ? (
                <button
                  className="flex justify-center items-center mt-5 cursor-pointer bg-transparent  border-2 border-black p-1 rounded-md text-black w-full hover:bg-[#5d5d5d] hover:text-white"
                  onClick={() => toast.info(doctor._id)}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="m-1" />
                  Following
                </button>
              ) : (
                <button
                  className="flex justify-center items-center mt-5 cursor-pointer bg-black outline-none border-none p-1 rounded-md text-white w-full hover:bg-[#5d5d5d]"
                  // onClick={() => handleFollowDr(doctor._id)}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="m-1" />
                  Follow
                </button>
              )} */}

              <button className="flex justify-center items-center mt-5  cursor-pointer bg-black outline-none border-none p-1 rounded-md text-white w-full hover:bg-[#5d5d5d]">
                <FontAwesomeIcon icon={faPlus} className="m-1" />
                Review
              </button>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-[85px] w-[43%] rounded-lg p-5 h-auto">
          <h1 className="font-bold">About</h1>
          <div
            className="rounded-lg shadow-sm p-2 h-[150px] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {doctor?.aboutOfDoctor}
          </div>
          <h1 className="font-bold">Feedbacks</h1>
          <div className="shadow-md rounded-lg p-3 flex flex-col h-[300px] overflow-y-auto">
            {Array(5)
              .fill()
              .map((index) => (
                <div
                  className="shadow-md rounded-lg p-2  m-2 border flex gap-2"
                  key={index}
                >
                  <img src={dummy} alt="" className="rounded-full w-8 h-8" />
                  <div>
                    <p className="">John Doe</p>
                    <div className="flex gap-1">
                      {Array(4)
                        .fill()
                        .map((index) => (
                          <p className="text-sm" key={index}>
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-yellow-400"
                            />
                          </p>
                        ))}
                    </div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quam natus non, veniam repudiandae quis saepe ab aliquam
                      itaque vero id deleniti suscipit. Repellat suscipit
                      nostrum enim, rerum modi ducimus nihil.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {!openBookPage ? (
        <Footer />
      ) : (
        <DoctorSloatBooking
          closeModal={() => setOpenBookPage(false)}
          doctorid={doctorid}
          bookingPageOpen={openBookPage}
        />
      )}
    </>
  );
};

export default Doctordetails;
