import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar, Pagination, ConfirmAlert } from "../..";
import { fetchUsers, searchUsers } from "../../../Redux/Admin/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import admin_Api from "../../../service/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import dummyImage from "../../../assets/Public/dummy.jpg";
import "./Userlist.css";

const Userlist = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.admin.filteredUsers);
  const [search, setSearch] = useState("");

  const handleUserSearch = (event) => {
    setSearch(event.target.value);
    dispatch(searchUsers(event.target.value.trim()));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleBlockUser = (userID) => {
    ConfirmAlert("Doy you want to block this user").then(async (response) => {
      if (response.isConfirmed) {
        try {
          await admin_Api.post(`/admin/blockuser?userid=${userID}`);
          toast.success("User Blocked successfully");
          dispatch(fetchUsers());
        } catch (error) {
          toast.error("Failed to block");
        }
      }
    });
  };

  const handleUnblockUser = async (userID) => {
    ConfirmAlert("Do you want to unblock this user").then(async (response) => {
      if (response.isConfirmed) {
        try {
          await admin_Api.post(`/admin/unblockuser?_userId=${userID}`);
          toast.success("User Unblocked successfully");
          dispatch(fetchUsers());
        } catch (error) {
          toast.error("Failed to unblock");
        }
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const userPerpage = 6;
  const lastUser = currentPage * userPerpage;
  const firstUser = lastUser - userPerpage;
  const currentUsers = usersList.slice(firstUser, lastUser);
  const totalPages = Math.ceil(usersList.length / userPerpage);

  return (
    <>
      <Toaster />
      <AdminNavbar />
      <div className="userList-main-container">
        <AdminSidebar />
        <div className="admin-userListing">
          <div className="user-sarch-container">
            <input
              type="search"
              placeholder="Search User"
              className="user-search-input"
              value={search}
              onChange={(event) => handleUserSearch(event)}
            />
          </div>
          <div className="user-listing-container">
            {usersList.length > 0 ? (
              <table className="userlistTable">
                <thead className="userList-heading">
                  <tr>
                    <th>Profile image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        {user.profileImage ? (
                          <img
                            src={dummyImage}
                            alt="profile"
                            className="users-profile-imges"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            className="default-users-Profile-icon"
                          />
                        )}
                      </td>

                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      {user.isBlocked ? (
                        <td>
                          <div className="DeActiveUserStatus">Deactive</div>
                        </td>
                      ) : (
                        <td>
                          <div className="ActiveUsesrStatus">Active</div>
                        </td>
                      )}
                      <td>
                        {user.isBlocked ? (
                          <button
                            className="user-block-button"
                            onClick={() => handleUnblockUser(user._id)}
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            className="user-block-button"
                            onClick={() => handleBlockUser(user._id)}
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="not-users">
                <h2>No users Found</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pagination-Container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Userlist;
