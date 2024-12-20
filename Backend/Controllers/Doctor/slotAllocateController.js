const Doctor = require("../../Model/doctorModel");
const { ObjectId } = require("mongodb");
const { getIO } = require("../../Config/Socket/socket.io");

const timeToMinutes = (time) => {
  const isPM = time.includes("PM");
  const [hourPart, minutePart] = time
    .replace(/AM|PM/, "")
    .trim()
    .split(":")
    .map(Number);

  let hours = hourPart;
  const minutes = minutePart;
  if (isPM && hours !== 12) {
    hours += 12;
  }
  if (!isPM && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};

const doctorSlotAllocate = async (req, res) => {
  try {
    const { doctorId, selectedDate, pickedTimes } = req.body;
    const findDoctor = await Doctor.findOne({ _id: doctorId });
    const isDateExist = findDoctor.timeAllocation.find(
      (existDate) => existDate.storedDate === selectedDate
    );

    if (isDateExist) {
      const isTimeExist = pickedTimes.some((time) =>
        isDateExist.selectedTimes.includes(time)
      );
      if (isTimeExist) {
        res
          .status(409)
          .json({ message: "Time already allocated for this date" });
        return;
      }

      const existingTimeMinute = isDateExist.selectedTimes
        .filter((time) => typeof time === "string" && time.includes(":"))
        .map(timeToMinutes);
      const lastTime = existingTimeMinute.slice(-1)[0];
      const pickedTimesToMinute = pickedTimes.map(timeToMinutes);
      const timeWith1hourGap = pickedTimesToMinute.some(
        (time) => time - lastTime < 60
      );

      if (timeWith1hourGap) {
        res.status(409).json({
          message:
            "Times must have a 1-hour gap from the last allocated time in the same date",
        });
        return;
      }

      if (isDateExist.selectedTimes.length + pickedTimes.length > 8) {
        res.status(409).json({
          message:
            "Allocation limit exceeded. You may only select up to 8 time slots per day.",
        });
        return;
      }

      await Doctor.findOneAndUpdate(
        { _id: doctorId, "timeAllocation.storedDate": selectedDate },
        {
          $push: {
            "timeAllocation.$.selectedTimes": { $each: pickedTimes },
          },
        }
      );
      getIO().emit("slotAllocated", { doctorId, selectedDate, pickedTimes });
      res.status(200).json({ message: "Slot successfully allocated" });
    } else {
      await Doctor.findOneAndUpdate(
        { _id: doctorId },
        {
          $push: {
            timeAllocation: {
              storedDate: selectedDate,
              selectedTimes: pickedTimes,
            },
          },
        },
        { upsert: true }
      );
    }
    getIO().emit("slotAllocated", { doctorId, selectedDate, pickedTimes });
    res
      .status(201)
      .json({ message: "New date and times successfully allocated" });
  } catch (err) {
    console.log(err.message);
  }
};

const doctorFetchSlots = async (req, res) => {
  try {
    const { doctorID } = req.query;
    const today = new Date();
    // today.setHours(0, 0, 0, 0);

    // await Doctor.updateOne(
    //   { _id: doctorID },
    //   {
    //     $pull: {
    //       timeAllocation: {
    //         storedDate: { $lt: today.toISOString().split("T")[0] },
    //       },
    //     },
    //   }
    // );

    const display = await Doctor.aggregate([
      { $match: { _id: new ObjectId(doctorID) } },
      { $unwind: "$timeAllocation" },
      { $group: { _id: doctorID, TimeAllocate: { $push: "$timeAllocation" } } },
    ]);
    res.json(display);
  } catch (err) {
    console.error("Error fetching slots:", err.message);
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};

const cancelIndividualTime = async (req, res) => {
  try {
    const { doctorid, time, date } = req.body;
    const doctorTime = await Doctor.findOne(
      { _id: doctorid, "timeAllocation.storedDate": date },
      { "timeAllocation.$": 1, _id: 0 }
    );
    const { selectedTimes } = doctorTime.timeAllocation[0];

    const updateSlot =
      selectedTimes.length === 1
        ? { $pull: { timeAllocation: { storedDate: date } } }
        : { $pull: { "timeAllocation.$.selectedTimes": time } };

    await Doctor.updateOne(
      { _id: doctorid, "timeAllocation.storedDate": date },
      updateSlot
    );
    getIO().emit("canceltime", { doctorid, time, date });

    res.status(200).json({
      message:
        selectedTimes.length === 1
          ? "The time and date has been successfully canceled."
          : "The time on date has been successfully canceled.",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  doctorSlotAllocate,
  doctorFetchSlots,
  cancelIndividualTime,
};
