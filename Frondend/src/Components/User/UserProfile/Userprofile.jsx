import React, { useEffect, useState } from "react";
import { Footer, Header, Usersidebar } from "../..";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import dummyImage from "../../../assets/Public/dummy.jpg";
import Fileupload from "../../../assets/Svg/Fileupload";
import "./Userprofile.css";

const Userprofile = () => {
  const { usertoken, userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <>
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
                    src={dummyImage}
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
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              </div>
            </>
          ) : (
            <div className="profileMainEditContainer">
              <input type="text" name="username" placeholder="Enter username" />
              <input type="number" name="mobile" placeholder="Enter mobile" />

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
                <button className="profileEditSaveButton">Save</button>
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
