const express = require("express");
const adminRoute = express.Router();
const { verifyToken } = require("../Utils/jwt");
const admimController = require("../Controllers/Admin/adminController");
const categoryController = require("../Controllers/Admin/categoryController");
const doctorListController = require("../Controllers/Admin/doctorListController")

const {fetchNewdoctors} = doctorListController

const {
  adminLoginVerify,
  adminFetchUsers,
  adminBlockUser,
  adminUnblockUser,
} = admimController;

const {
  addCategory,
  adminFetchCategories,
  blockCategory,
  unblockCategory,
  editCategory,
} = categoryController;

adminRoute
  .post("/adminlogin", adminLoginVerify)
  .get("/fetchusers", verifyToken, adminFetchUsers)
  .post("/blockuser", verifyToken, adminBlockUser)
  .post("/unblockuser", verifyToken, adminUnblockUser)
  .post("/addcategory", verifyToken, addCategory)
  .get("/fetchcategories", verifyToken, adminFetchCategories)
  .post("/categoryblock", verifyToken, blockCategory)
  .post("/unblockcategory", verifyToken, unblockCategory)
  .post("/editcategory", verifyToken, editCategory)
  .get('/doctors',verifyToken,fetchNewdoctors)
  

module.exports = adminRoute;
