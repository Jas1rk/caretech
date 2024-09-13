import React, { useCallback, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCouch,
  faMessage,
  faPowerOff,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConfirmAlert } from "../..";
import { useDispatch } from "react-redux";
import { docorLogout } from "../../../Redux/Doctor/DoctorSlice";

const Doctorsidebar = ({ open ,setOpen}) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(location.pathname);
  const handleActive = (path) => {
    setIsActive(path);
    setOpen(false)
  };
  const handleLogout = useCallback(() => {
      ConfirmAlert("Do you want to logout").then((result) => {
      if (result.isConfirmed) {
        dispatch(docorLogout());
        navigate("/doctor/doctorlogin");
      }
    });
  }, [dispatch, navigate]);

  return (
    <div
      className="bg-white shadow-2xl w-full sm:w-72 h-72 sm:h-full sm:right-0 fixed top-[80px] p-4 z-50 "
      data-aos={open ? "fade-left" : ""}
    >
      <ul className="m-1">
        <li
          className={`items-center m-2  cursor-pointer shadow-2xl rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white ${
            isActive === "/doctor/doctorprofile"
              ? "bg-gradient-to-r from-teal-700 to-blue-900 text-white"
              : ""
          }`}
          onClick={() => handleActive()}
        >
          <FontAwesomeIcon icon={faUserDoctor} />
          <Link className="ml-2" to="/doctor/doctorprofile">
            Profile
          </Link>
        </li>
        <li className="flex items-center m-2  cursor-pointer shadow-2xl rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white">
          <FontAwesomeIcon icon={faBook} />
          <Link className="ml-2" to="/doctor/appointment">
            Bookings
          </Link>
        </li>
        <li className="flex items-center m-2  cursor-pointer shadow-2xl rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white">
          <FontAwesomeIcon icon={faCouch} />
          <Link className="ml-2" to="/doctor/appointment">
            Sloat Alocation
          </Link>
        </li>
        <li className="flex items-center m-2  cursor-pointer shadow-2xl rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white">
          <FontAwesomeIcon icon={faMessage} />
          <Link to="/doctor/chat" className="ml-2">
            Chat
          </Link>
        </li>
        <li className="flex items-center m-2  cursor-pointer shadow-2xl rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white">
          <FontAwesomeIcon icon={faPowerOff} />
          <p className="ml-2" onClick={handleLogout}>
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Doctorsidebar;
