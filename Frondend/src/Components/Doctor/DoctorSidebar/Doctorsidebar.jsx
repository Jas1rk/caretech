import React, { useCallback, useEffect,  useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConfirmAlert } from "../..";
import { useDispatch } from "react-redux";
import { docorLogout } from "../../../Redux/Doctor/DoctorSlice";
import { sidebarItems } from "./Drsidebararray";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Doctorsidebar = ({ open, setOpen }) => {
  
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(location.pathname);

  const handleActive = useCallback(
    (path) => {
      setIsActive(path);
      setOpen(false);
    },
    [setOpen]
  );

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
        {sidebarItems.map((items) => (
          <li
            key={items.path}
            className={`items-center m-2  cursor-pointer shadow-md rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white ${
              isActive === items.path
                ? "bg-gradient-to-r from-teal-700 to-blue-900 text-white"
                : ""
            }`}
            onClick={() => handleActive(items.path)}
          >
            <FontAwesomeIcon icon={items.icon} />
            <Link className="ml-2" to={items.path}>
              {items.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center m-2  cursor-pointer shadow-md rounded-2xl border p-2 hover:bg-gradient-to-r from-teal-700 to-blue-900 hover:text-white">
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
