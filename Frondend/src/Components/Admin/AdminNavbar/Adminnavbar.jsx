import React, { useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../Redux/Admin/AdminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import "./Adminnavbar.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Adminnavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/adminlogin");
  };

  const [openModal, setOpenModal] = useState(false);
  let subtitle;
  const hadleOpen = () => {
    setOpenModal(true);
  };

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <>
      <div className="admin-navbar">
        <div className="admin-header-logoContainer">
          <Logo />
        </div>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="cursor-pointer text-3xl"
          onClick={hadleOpen}
        />
        <button className="admin-logout-button" onClick={handleAdminLogout}>
          Logout
        </button>
      </div>

      {openModal && (
        <div>
          <Modal
            isOpen={openModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Notifications</h2>

            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-5">
                <p>name888888888</p>
                <p>email99999999</p>
                <button className="bg-lime-600 w-24 h-8 flex justify-center items-center outline-none rounded-lg">
                  send otp
                </button>
                <button className="bg-red-600 w-24 h-8 flex justify-center items-center outline-none rounded-lg text-white">
                  decline
                </button>
              </div>

              <div className="flex justify-center items-center gap-5 m-2">
                <p>name888888888</p>
                <p>email99999999</p>
                <button className="bg-lime-600 w-24 h-8 flex justify-center items-center outline-none rounded-lg">
                  send otp
                </button>
                <button className="bg-red-600 w-24 h-8 flex justify-center items-center outline-none rounded-lg">
                  Decline
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Adminnavbar;
