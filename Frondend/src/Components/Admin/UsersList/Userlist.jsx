import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar, Pagination } from "../..";
import { fetchUsers, searchUsers } from "../../../Redux/Admin/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import admin_Api from "../../../service/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
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

  const handleBlockUser = async (userID) => {
    await admin_Api
      .post(`/admin/blockuser?userid=${userID}`)
      .then((response) => {
        toast.success("User Blocked Successfully");
      })
      .catch((err) => {
        toast.error("Failed to Block User");
      });
  };

  const handleUnblockUser = async (userID) => {
    toast.success(userID)
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
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
