const Doctor = require("../../Model/doctorModel");
const {verificationSuccess,unVerifyResponse} = require("../../Utils/modemailer")

const fetchNewdoctors = async (req, res) => {
  try {
    const findAllDr = await Doctor.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      { $unwind: "$categoryData" },
      {
        $project: {
          nameOfDoctor: 1,
          emailOfDoctor: 1,
          degreeOfDoctor: 1,
          mobileOfDoctor: 1,
          certificate: 1,
          isVerified:1,
          profileImageOfDoctor:1,
          "categoryData.categoryName": 1,
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.json(findAllDr);
  } catch (err) {
    console.log(err);
  }
};

const adminVerifyDr = async (req, res) => {
  try {
    const {drid,drName,drEmail,drDegree} = req.body
    const verify = await Doctor.findOneAndUpdate(
      { _id: drid },
      { isVerified: true }
    );
    await verificationSuccess(drName,drEmail,drDegree)
    console.log("completed verification", verify);
    res.json(verify); 
  } catch (err) {
    console.log(err);
  }
};

const adminUnverifyDr = async(req,res)=>{
  try{
    const {drid,drName,drEmail} = req.body
    const findDr = await Doctor.findOneAndUpdate({_id:drid},{isVerified:false})
    if(findDr){
      await unVerifyResponse(drEmail,drName)
      const unverify = await Doctor.deleteOne({_id:drid})
      res.json(unverify);
    }
  }catch(err){
    console.log(err);
  }
}

module.exports = {
  fetchNewdoctors,
  adminVerifyDr,
  adminUnverifyDr
};
