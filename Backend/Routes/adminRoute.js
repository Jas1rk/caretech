const express = require("express");
const adminRoute = express.Router();
const { verifyAccessToken } = require("../Utils/jwt");
const adminController = require("../Controllers/Admin/adminController");
const categoryController = require("../Controllers/Admin/categoryController");
const doctorListController = require("../Controllers/Admin/doctorListController");

const { fetchNewdoctors, adminVerifyDr, adminUnverifyDr } =
  doctorListController;

const { adminLoginVerify, adminFetchUsers, adminBlockUser, adminUnblockUser } =
adminController;

const {
  addCategory,
  adminFetchCategories,
  blockCategory,
  unblockCategory,
  editCategory,
} = categoryController;

adminRoute
  .post("/adminlogin", adminLoginVerify)
  .get("/fetchusers", verifyAccessToken, adminFetchUsers)
  .post("/blockuser", verifyAccessToken, adminBlockUser)
  .post("/unblockuser", verifyAccessToken, adminUnblockUser)
  .post("/addcategory", verifyAccessToken, addCategory)
  .get("/fetchcategories", verifyAccessToken, adminFetchCategories)
  .post("/categoryblock", verifyAccessToken, blockCategory)
  .post("/unblockcategory", verifyAccessToken, unblockCategory)
  .post("/editcategory", verifyAccessToken, editCategory)
  .get("/doctors", verifyAccessToken, fetchNewdoctors)
  .post("/verifydr", verifyAccessToken, adminVerifyDr)
  .post("/unverifydr", verifyAccessToken, adminUnverifyDr);

module.exports = adminRoute;
