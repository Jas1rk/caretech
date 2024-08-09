import React, { useState } from "react";
import { AdminNavbar, AdminSidebar, Pagination } from "../..";
import "./Userlist.css";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
  { id: 2, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
  { id: 3, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
  { id: 4, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
  { id: 5, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
  { id: 6, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
  { id: 7, name: 'John Doe', email: 'john@example.com' , mobile:'1234567890' },
  { id: 8, name: 'John Doe', email: 'john@example.com' , mobile:'1234567890' },
  { id: 9, name: 'John Doe', email: 'john@example.com' , mobile:'1234567890' },
  { id: 10, name: 'John Doe', email: 'john@example.com' , mobile:'1234567890' },
];
const Userlist = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const usersList = 6
  const lastUser = currentPage * usersList
  const firstUser  = lastUser - usersList
  const currentUsers = users.slice(firstUser,lastUser)
  const totalPages = Math.ceil(users.length / usersList)
  return (
    <>
      <AdminNavbar />
      <div className="userList-main-container">
        <AdminSidebar />

        <div className="admin-userListing">
          <div className="user-sarch-container">
            <input
              type="search"
              placeholder="Search User"
              className="user-search-input"
            />
          </div>
          <div className="user-listing-container">
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
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>Block</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
