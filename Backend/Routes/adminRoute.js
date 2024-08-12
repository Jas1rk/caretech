const express = require("express");
const adminRoute = express.Router();
const { verifyToken } = require("../Utils/jwt");
const admimController = require("../Controllers/Admin/adminController");

const { adminLoginVerify, adminFetchUsers, adminBlockUser, adminUnblockUser } =
  admimController;

adminRoute
  .post("/adminlogin", adminLoginVerify)
  .get("/fetchusers", adminFetchUsers)
  .post("/blockuser", adminBlockUser)
  .post("/unblockuser", adminUnblockUser);

module.exports = adminRoute;
