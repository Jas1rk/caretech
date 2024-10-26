const Doctor = require("../../Model/doctorModel");

const doctorSlotAllocate = async (req, res) => {
  try {
    const { doctorId, selectedDate, pickedTimes } = req.body; 
    const findDoctor = await Doctor.findOne({ _id: doctorId });
    const isDateExist = findDoctor.timeAllocation.find((existDate) => existDate.storedDate === selectedDate)
    if(isDateExist){
        const isTimeExist =  pickedTimes.some((time) => isDateExist.selectedTimes.includes(time))
      if(isTimeExist){
       res.status(409).json({message:"Time already allocated for this date"})
    
      }else{
        await Doctor.findOneAndUpdate({_id:doctorId,'timeAllocation.storedDate':selectedDate},{
         $push:{
           'timeAllocation.$.selectedTimes':{$each:pickedTimes}
         }
        }) 
        res.status(200).json({message:"Slot successfully allocated"})
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
    res.status(201).json({message:"New date and times successfully allocated"})
  } catch (err) {
    console.log(err.message);
  }
};

 
module.exports = {
  doctorSlotAllocate,
};
