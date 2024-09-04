const Doctor = require("../../Model/doctorModel");

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
          "categoryData.categoryName": 1,
        },
      },
      { $sort: { _id: -1 } }
    ]);
    res.json(findAllDr);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchNewdoctors,
};
