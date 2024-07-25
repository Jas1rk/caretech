const User = require('../Model/userModel')
const emailVerification = require('../Utils/modemailr')

const OTPstore = {}
const userRegister = async (req, res) => {
  try {
    const {email} = req.body
    const existingUser = await User.findOne({email:email})
    if(existingUser){
      res.json('userExist')
    }else{
      const genaratedOTP = await emailVerification(email)
      OTPstore[email] = genaratedOTP
      console.log('this is otp getting',OTPstore[email])
      res.json(genaratedOTP)
    }
  } catch (err) {
    console.log(err.message);
  }
}

const verifyOtp = async(req,res)=>{
  try{

  }catch(err){
    console.log(err.message)
  }
}

module.exports = { userRegister,verifyOtp };
