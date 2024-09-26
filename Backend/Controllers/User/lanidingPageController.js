const Category = require("../../Model/categoryModel");
const Doctor = require("../../Model/doctorModel");
const { ObjectId } = require("mongodb");

const getCategories = async (req, res) => {
  try {
    const fetchCatgory = await Category.find({ isBlocked: false });
    res.json(fetchCatgory);
  } catch (err) {
    console.log(err);
  }
};

const fetchDoctors = async (req, res) => {
  try {
    const fetch = await Doctor.aggregate([
      {
        $match: { isVerified: true },
      },
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
          isVerified: 1,
          profileImageOfDoctor: 1,
          yearsOfExperience: 1,
          stateOfDoctor: 1,
          countryOfDoctor: 1,
          locationOfDoctor: 1,
          aboutOfDoctor: 1,
          "categoryData.categoryName": 1,
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.json(fetch);
  } catch (err) {
    console.log(err);
  }
};

const doctorDetails = async (req, res) => {
  try {
    const drId = req.params.doctorid;
    const drData = await Doctor.aggregate([
      {
        $match: { _id: new ObjectId(drId) },
      },

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
          isVerified: 1,
          profileImageOfDoctor: 1,
          yearsOfExperience: 1,
          stateOfDoctor: 1,
          countryOfDoctor: 1,
          locationOfDoctor: 1,
          aboutOfDoctor: 1,
          "categoryData.categoryName": 1,
        },
      },
    ]);
    res.json(drData)
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCategories,
  fetchDoctors,
  doctorDetails,
};
