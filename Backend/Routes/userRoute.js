const express = require('express')
const userRouter = express.Router()
const userController = require('../Controllers/userController')

const {userRegister,verifyOtp} = userController

userRouter.post('/register',userRegister).post('/otp',verifyOtp)


module.exports = userRouter