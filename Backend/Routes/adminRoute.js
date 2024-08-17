const express = require("express");
const adminRoute = express.Router();
const { verifyToken } = require("../Utils/jwt");
const admimController = require("../Controllers/Admin/adminController");

const { adminLoginVerify, adminFetchUsers, adminBlockUser, adminUnblockUser } =
  admimController;

adminRoute
  .post("/adminlogin", adminLoginVerify)
  .get("/fetchusers",verifyToken, adminFetchUsers)
  .post("/blockuser",verifyToken, adminBlockUser)
  .post("/unblockuser",verifyToken, adminUnblockUser);

module.exports = adminRoute;
