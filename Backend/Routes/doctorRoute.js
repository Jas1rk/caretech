const express =  require('express')
const doctorRoute = express.Router()
const doctorController = require('../Controllers/Doctor/doctorController')
const upload = require('../Utils/multer')

const {registerForDoctor} = doctorController

doctorRoute
    .post('/doctorregister',upload.single('certificate'),registerForDoctor)

module.exports = doctorRoute