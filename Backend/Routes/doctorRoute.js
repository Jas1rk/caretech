const express =  require('express')
const doctorRoute = express.Router()
const doctorController = require('../Controllers/Doctor/doctorController')
const upload = require('../Utils/multer')
const { verifyToken } = require("../Utils/jwt");

const {registerForDoctor,fetchNewDoctorsRequest,sendOtpToDoctor} = doctorController

doctorRoute
    .post('/doctorregister',upload.single('certificate'),registerForDoctor)
    .get("/newdoctorsrequest", fetchNewDoctorsRequest)
    .post('/sendotptonewdoctor',sendOtpToDoctor)

module.exports = doctorRoute