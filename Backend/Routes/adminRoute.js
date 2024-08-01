const express = require('express')
const adminRoute = express.Router()
const admimController = require('../Controllers/Admin/adminController')

const {adminLoginVerify} = admimController

adminRoute.post('/adminlogin',adminLoginVerify)

module.exports = adminRoute