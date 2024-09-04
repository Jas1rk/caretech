const Doctor = require('../../Model/doctorModel')



const fetchNewdoctors = async(req,res)=>{
    try{
        const findAllDr = await Doctor.find({})
        console.log("here si foud",findAllDr)
        res.json(findAllDr)
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    fetchNewdoctors,
}