import React, { useState } from "react";
import { AdminNavbar, AdminSidebar, Pagination } from "../..";
import { toast } from "sonner";
import "./Admincategory.css";

const Admincategory = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <AdminNavbar />
      <div className="categoryMainContainer">
        <AdminSidebar />
        <div className="categoryMainContainerRight">
          <div className="categoryHeadings">
            <h2>Categories</h2>
            <div className="user-sarch-container">
              <input
                type="search"
                placeholder="Search User"
                className="user-search-input"
              />
            </div>
            <button
              className="add-Category-Button"
              onClick={() => setAddCategory(true)}
            >
              Add Category
            </button>
          </div>
          {(addCategory || isEdit) && (
            <div className="addCategoryContainer">
              {!isEdit ? (
                <>
                  <input type="text" placeholder="Enter name" />
                  <textarea
                    name="description"
                    placeholder="Enter description"
                  ></textarea>
                  <div className="cateGoryBottonContianer">
                    <button className="createCategoryButton">Create</button>
                    <button
                      className="cancelCategoryButton"
                      onClick={() => setAddCategory(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input type="text" placeholder="edit name" />
                  <textarea name="description" placeholder="Edit"></textarea>
                  <div className="cateGoryBottonContianer">
                    <button className="editCategoryButton">Edit</button>
                    <button
                      className="cancelCategoryButton"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <>
            <div className="categoryTable-Container">
              <table className="categoryTable">
                <thead className="categoryList-heading">
                  <tr>
                    <th>Category Name</th>
                    <th>Category Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Acion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Category 1</td>
                    <td className="categoryDiscription">
                      Hello this is out first category for caretech hospitaliy
                      where you can find diffrent categories , we provide good
                      service for our soft costumers
                    </td>
                    <td>
                      <div className="activeCat">Active</div>
                    </td>
                    <td>
                      <button
                        className="catEditOpen"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="catBlock">Block</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
      <div className="pagination-Container">
        <Pagination />
      </div>
    </>
  );
};

export default Admincategory;
