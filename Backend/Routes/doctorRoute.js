const express =  require('express')
const doctorRoute = express.Router()
const doctorController = require('../Controllers/Doctor/doctorController')
const upload = require('../Utils/multer')

const {registerForDoctor,sendOtpToDoctor} = doctorController

doctorRoute
    .post('/doctorregister',upload.single('certificate'),registerForDoctor)
    .get('send-otp', sendOtpToDoctor)

module.exports = doctorRoute