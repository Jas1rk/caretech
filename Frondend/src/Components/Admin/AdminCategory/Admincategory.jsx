import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar, ConfirmAlert, Pagination } from "../..";
import { toast } from "sonner";
import Useform from "../../../Hooks/Useform";
import {
  createCategory,
  editCategory,
  fetchCategories,
} from "../../../Redux/Admin/AdminThunk";
import { useDispatch, useSelector } from "react-redux";
import admin_Api from "../../../service/AxiosInstance";
import "./Admincategory.css";

const Admincategory = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [values, handleInput, setValues] = Useform({
    category: "",
    description: "",
  });
  const [searchcat, setSearchcat] = useState("");
  const { category, description } = values;
  const { categories } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleNewCategory = () => {
    dispatch(createCategory({ category, description, toast }))
      .unwrap()
      .then(() => {
        toast.success("Category added");
        dispatch(fetchCategories());
        setValues({ category: "", description: "" });
        setAddCategory(false);
      });
  };

  const filterCategories = categories.filter((category) => {
    return category.categoryName
      .toLowerCase()
      .includes(searchcat.toLocaleLowerCase());
  });

  const handleBlockCat = (categId) => {
    ConfirmAlert("Do you want to block this category").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await admin_Api.post(`/admin/categoryblock?categId=${categId}`);
          toast.success("Category Blocked");
          dispatch(fetchCategories());
        } catch (err) {
          toast.error("An error occures please check");
        }
      }
    });
  };

  const handleUnblockCat = (categId) => {
    ConfirmAlert("Do you want to unblock this category").then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            await admin_Api.post(`/admin/unblockcategory?categId=${categId}`);
            toast.success("Category Unblocked");
            dispatch(fetchCategories());
          } catch (err) {
            toast.error("An error occures please check");
          }
        }
      }
    );
  };

  const handleEditOpen = (categid, categoryName, categoryDescription) => {
    setIsEdit(categid);
    setValues({
      category: categoryName || "",
      description: categoryDescription || "",
    });
  };

  const handleSaveEdit = () => {
    const findExist = categories.find(
      (category) =>
        category.categoryName.toLowerCase() === values.category.toLowerCase() &&
        category._id !== isEdit
    );
    if (findExist) {
      toast.error("Category already exist");
    } else {
      ConfirmAlert("Do you want to save this category").then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(
            editCategory({ categoryid: isEdit, category, description, toast })
          )
            .unwrap()
            .then(() => {
              toast.success("Category Updated");
              dispatch(fetchCategories());
              setIsEdit(null);
              setValues({ category: "", description: "" });
            });
        }
      });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 3;
  const lastCategory = currentPage * categoryPerPage;
  const firstCategory = lastCategory - categoryPerPage;
  const currentCategory = filterCategories.slice(firstCategory, lastCategory);
  const totalPages = Math.ceil(filterCategories.length / categoryPerPage);

  return (
    <>
      <AdminNavbar />
      <div className="categoryMainContainer">
        <AdminSidebar />
        <div className="categoryMainContainerRight">
          <div className="categoryHeadings">
            <h2>
              {isEdit
                ? "Edit Category"
                : addCategory
                ? "Add Category"
                : "Categories"}
            </h2>
            <div className="user-sarch-container">
              <input
                type="search"
                placeholder="Search Category"
                className="user-search-input"
                value={searchcat}
                onChange={(e) => setSearchcat(e.target.value)}
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
                  <input
                    type="text"
                    name="category"
                    placeholder="Enter name"
                    value={category}
                    onChange={handleInput}
                  />
                  <textarea
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={handleInput}
                  ></textarea>
                  <div className="cateGoryBottonContianer">
                    <button
                      className="createCategoryButton"
                      onClick={handleNewCategory}
                    >
                      Create
                    </button>
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
                  <input
                    type="text"
                    placeholder="edit name"
                    name="category"
                    value={category}
                    onChange={handleInput}
                  />
                  <textarea
                    name="description"
                    placeholder="Edit description"
                    value={description}
                    onChange={handleInput}
                  ></textarea>
                  <div className="cateGoryBottonContianer">
                    <button
                      className="editCategoryButton"
                      onClick={handleSaveEdit}
                    >
                      Edit
                    </button>
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
                  {currentCategory.map((category, index) => (
                    <tr key={index}>
                      <td>{category.categoryName}</td>
                      <td className="category-Discription">
                        {category.categoryDescription}
                      </td>
                      {category.isBlocked ? (
                        <>
                          <td>
                            <div className="deactiveCat">Deactive</div>
                          </td>
                        </>
                      ) : (
                        <td>
                          <div className="activeCat">Active</div>
                        </td>
                      )}

                      <td>
                        <button
                          className="catEditOpen"
                          onClick={() =>
                            handleEditOpen(
                              category._id,
                              category.categoryName,
                              category.categoryDescription
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        {category.isBlocked ? (
                          <button
                            className="catunBlock"
                            onClick={() => handleUnblockCat(category._id)}
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            className="catBlock"
                            onClick={() => handleBlockCat(category._id)}
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
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

export default Admincategory;
