const Doctor = require("../../Model/doctorModel");

const doctorSlotAllocate = async (req, res) => {
  try {
    const { doctorId, selectedDate, pickedTimes } = req.body; 
    const findDoctor = await Doctor.findOne({ _id: doctorId });
    console.log("here is the doctor",findDoctor)
    const findt = findDoctor.timeAllocation.selectedTimes
    console.log("times==========>>>>",findt)
    const isDateExist = findDoctor.timeAllocation.find((existDate) => existDate.selectedDate === selectedDate)
    console.log("date is already in database",isDateExist)
    if(isDateExist){
      const isTimeAlreadyList = isDateExist.selectedTimes.includes(pickedTimes)
      console.log("The selected time is already allocated for this date.",isTimeAlreadyList)
      if(isTimeAlreadyList){
        console.log("the time is already in list")
      }else{
         await Doctor.findOneAndUpdate({_id:doctorId,'timeAllocation.selectedDate':selectedDate},{
          $push:{
            'timeAllocation.$.selectedTimes':pickedTimes
          }
         })
      }  
    }else{
      await Doctor.findOneAndUpdate({_id:doctorId},{
        $push:{
          timeAllocation:{
            selectedDate:selectedDate,
            selectedTimes:pickedTimes
          }
        }
      },{upsert:true})
    }
    const afterUpdate = await Doctor.findOne({_id:doctorId})
    console.log("after===updating=====>>>",afterUpdate)
    res.json(findDoctor);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  doctorSlotAllocate,
};
