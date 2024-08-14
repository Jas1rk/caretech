import React, { useEffect, useState } from "react";
import { Footer, Header, Usersidebar } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Fileupload from "../../../assets/Svg/Fileupload";
import Useform from "../../../Hooks/Useform";
import { userProfileEdit } from "../../../Redux/User/ProfileSlice";
import toast, { Toaster } from "react-hot-toast";

import "./Userprofile.css";

const Userprofile = () => {
  const userData  = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [values, handleInput, setValues] = Useform({
    username: "",
    mobile: "",
  });
  const { username, mobile } = values;

  const handleEditOpen = () => {
    setIsEdit(true);
    setValues({
      username: userData.username || "",
      mobile: userData.mobile || "",
    }); 
  };

  useEffect(() => {
    setIsEdit(false);
  },[userData]);


  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("userID", userData.id);
    formData.append("username", username);
    formData.append("mobile", mobile);
    if (image) {
      formData.append("image", image);
    }
    dispatch(userProfileEdit({ formData, username, mobile, image, toast }))
    
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="userProfileMailContainer">
        <Usersidebar />
        <div className="userProfileDetails">
          {!isEdit ? (
            <>
              <div className="profileimageAndIconContainer">
                {!userData.profileImage ? (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="ProfileMailIcon"
                  />
                ) : (
                  <img
                    src={`../src/assets/images/${userData.profileImage}`}
                    alt="profile"
                    className="profileMainImage"
                  />
                )}
              </div>
              <div className="pofaileDetailsMain">
                <h4>Username: {userData.username}</h4>
                <h4>Email: {userData.email}</h4>
                <h4>Mobile: {userData.mobile}</h4>
              </div>
              <div className="profileEditMainbuttonContainer">
                <button
                  className="profileEditMainButton"
                  onClick={handleEditOpen}
                >
                  Edit
                </button>
              </div>
            </>
          ) : (
            <div className="profileMainEditContainer">
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleInput}
                value={username}
              />
              <input
                type="number"
                name="mobile"
                placeholder="Enter mobile"
                onChange={handleInput}
                value={mobile}
              />

              <div className="profieEditPreview">
                {image && (
                  <>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="discard"
                      onClick={() => setImage(null)}
                    />
                    <img
                      src={image ? URL.createObjectURL(image) : ""}
                      alt="profile image"
                      className="preview-image"
                    />
                  </>
                )}
              </div>
              <Fileupload />
              <input
                name="image"
                id="file"
                type="file"
                className="profile-imageInput"
                onChange={(event) => setImage(event.target.files[0])}
              />

              <div className="profileEditSaveandCancel">
                <button
                  className="profileEditSaveButton"
                  onClick={handleUpdateProfile}
                >
                  Save
                </button>
                <button
                  className="profileEditCancelButton"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Userprofile;
