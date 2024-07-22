const express = require('express')
const userRouter = express.Router()
const userController = require('../Controllers/userController')

const {userRegister} = userController

userRouter.post('/register',userRegister)

module.exports = userRouter