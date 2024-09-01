import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../Redux/Admin/AdminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import axios from "axios";
import { backendUrl } from "../../../service/backendUrl";
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
  const [data,setData] = useState()
  let subtitle;
  const hadleOpen = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    if (openModal) {
      const fetchNewDoctors = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/doctor/newdoctorsrequest`
          );
          console.log(response.data);
          setData(response.data)
        } catch (err) {
          console.log(err);
        }
      };
      fetchNewDoctors();
    }
  }, [openModal]);

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpenModal(false);
  }

  const handleSendOtp = async(drEmail,drName) => {
    try{
      const response = await axios.post(`${backendUrl}/doctor/sendotptonewdoctor`,{drEmail,drName})
    }catch(err){
      console.log(err)
    }
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

            <div className="flex flex-col justify-between items-center">
            {data ? (
                data.map((data, index) => (
                  <div
                  className="flex justify-between items-center gap-5 m-1 p-3 border-b"
                  key={index}
                >
                  <div className="flex flex-col flex-1 text-start">
                    <p className="font-semibold">{data.notifications.doctorname}</p>
                    <p>{data.notifications.doctoremail}</p>
                  </div>
                 
                    <button
                      className="bg-lime-600 w-24 h-8 flex justify-center items-center outline-none rounded-lg"
                      onClick={() => handleSendOtp(data.notifications.doctoremail,data.notifications.doctorname)}
                    >
                      Send OTP
                    </button>
                    <button className="bg-red-600 w-24 h-8 flex justify-center items-center outline-none rounded-lg text-white">
                      Decline
                    </button>
                
                </div>
                
                ))
              ) : (
                <p>Loading...</p> 
              )}

         
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Adminnavbar;
