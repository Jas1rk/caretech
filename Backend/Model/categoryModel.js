const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Category = mongoose.model('Category',categorySchema)
module.exports = Category;