const Doctor = require("../../Model/doctorModel");

const doctorSlotAllocate = async (req, res) => {
  try {
    const { doctorId, selectedDate, pickedTimes } = req.body; 
    const findDoctor = await Doctor.findOne({ _id: doctorId });
    // console.log("here is the doctor",findDoctor)
 
    const isDateExist = findDoctor.timeAllocation.find((existDate) => existDate.storedDate === selectedDate)
    if(isDateExist){
        console.log("Existing date time",isDateExist.selectedTimes)
        console.log("here is the picked times",pickedTimes)
        // const existingTime = isDateExist.selectedTimes.flat()
        // console.log("here we check the array flat",existingTime)
      const isTimeExist = pickedTimes.some((time) => isDateExist.selectedTimes.includes(time))
      console.log("is date exist",)
      // console.log('here is the rest times',restTimes.length)
      if(isTimeExist){
        console.log("The selected time is already allocated for this date.",isTimeExist)
      }else{
         
         console.log("the else condtion is working")
         await Doctor.findOneAndUpdate({_id:doctorId,'timeAllocation.storedDate':selectedDate},{
          $push:{
            'timeAllocation.$.selectedTimes':{$each:restTimes}
          }
         }) 
      }  
    }else{
      await Doctor.findOneAndUpdate({_id:doctorId},{
        $push:{
          timeAllocation:{
            storedDate:selectedDate,
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
